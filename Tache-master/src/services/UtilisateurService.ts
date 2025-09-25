import { Utilisateur } from "@prisma/client";
import { UtilisateurRepository } from "../repositories/UtilisateurRepository.js";
import bcrypt from "bcrypt";
import { UserLogin } from "../types/typeUser.js";
import JWT from "jsonwebtoken";
import { env } from "../config/env.js";
import { Request } from "express";

export class UtilisateurService {
  private userRepo: UtilisateurRepository = new UtilisateurRepository();

  async create(data: Omit<Utilisateur, "id">): Promise<Utilisateur> {
    const hashpassword = await bcrypt.hash(data.password, 10);
    const newUser = this.userRepo.create({ ...data, password: hashpassword });
    return newUser;
  }

  async findAll(req: Request): Promise<Utilisateur[]> {
    const users= await this.userRepo.findAll()
    users.map((user)=>{
          if (user.photo) user.photo=`${req.protocol}://${req.get("host")}/uploads/${user.photo}`
    })
    return users;
  }

  async findById(id: number): Promise<Utilisateur | null> {
    return this.userRepo.findById(id);
  }

  async update(
    id: number,
    data: Partial<Omit<Utilisateur, "id">>
  ): Promise<Utilisateur> {
    return this.userRepo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.userRepo.delete(id);
  }

  async login(dataUser: UserLogin) {
    const user = await this.userRepo.findByEmail(dataUser.email);
    if (!user) throw new Error("Utilisateur introuvable ou email incorrect");

    if (!dataUser.password || !user.password) {
      throw new Error("Mot de passe manquant");
    }

    const compare = await bcrypt.compare(dataUser.password, user.password);
    if (!compare) throw new Error("Mot de passe incorrect");

    const token = JWT.sign(
      {
        id: user.id,
        email: user.email,
      },
      env.jwt,
      { expiresIn: "1h" }
    );

    const refreshtoken = JWT.sign(
      {
        id: user.id,
        email: user.email,
      },
      env.jwtRefresh,
      { expiresIn: "24h" }
    );

    return { user, token, refreshtoken };
  }
}
