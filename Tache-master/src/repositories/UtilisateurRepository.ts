import { Utilisateur } from "@prisma/client";
import { IRepository } from "./IRepository.js";
import { UserLogin } from "../types/typeUser.js";
import { prisma } from "../config/prisma.js";


export class UtilisateurRepository implements IRepository<Utilisateur> {
  async findAll(): Promise<Utilisateur[]> {
    return await prisma.utilisateur.findMany();
  }

  async findById(id: number): Promise<Utilisateur | null> {
    return await prisma.utilisateur.findUnique({
      where: { id },
    });
  }

  async create(data: Omit<Utilisateur, "id">): Promise<Utilisateur> {
    return await prisma.utilisateur.create({
      data,
    });
  }

  async update(
    id: number,
    data: Partial<Omit<Utilisateur, "id">>
  ): Promise<Utilisateur> {
    return await prisma.utilisateur.update({
      where: { email: data.email },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.utilisateur.delete({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<UserLogin | null> {
    return await prisma.utilisateur.findUnique({
      select: { email: true, nom: true, prenom: true, password: true, id: true, photo: true },
      where: { email },
    });
  }

  
}
