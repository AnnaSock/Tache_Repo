import { UtilisateurService } from "../services/UtilisateurService.js";
import { Request, Response } from "express";
import { utilisateurSchema, loginSchema } from "../validators/Utilisateur.js";
import JWT from "jsonwebtoken";
import { env } from "../config/env.js";
import { prisma } from "../config/prisma.js";
import { Prisma } from "@prisma/client";
export class UtilisateurController {
  private static userSer: UtilisateurService = new UtilisateurService();

  private static async handleRequest(
    res: Response,
    callback: () => Promise<any>,
    successStatus = 200
  ) {
    try {
      const data = await callback();
      res.status(successStatus).json({ status: "success", data });
    } catch (mnError: any) {
      const statusCode =
        mnError.message?.includes("introuvable") ||
        mnError.message?.includes("ID") ||
        mnError.message?.includes("Accès interdit")
          ? 403
          : 400;

      res
        .status(statusCode)
        .json({ status: "error", message: mnError.message });
    }
  }

  // static async create(req: Request, res: Response) {
  //   const valide = utilisateurSchema.safeParse(req.body);
  //   if (!valide.success)
  //     return res
  //       .status(400)
  //       .json({ message: "Erreur Creation", error: valide.error.format() });
  //   const userValid = await UtilisateurController.userSer.create(valide.data);
  //   res.status(200).json(userValid);
  // }

  static async create(req: Request, res: Response) {
    // Construire les données à valider avec la photo uploadée comme chemin
    console.log(req.body);
    console.log(req.file)
    
    const dataToValidate = {
      ...req.body,
      photo: req.file ? `/uploads/${req.file.filename}` : "",
      telephone: Number(req.body.telephone), // conversion si nécessaire
    };

    // Validation Zod
    const valide = utilisateurSchema.safeParse(dataToValidate);
    if (!valide.success) {
      return res.status(400).json({
        message: "Erreur de validation",
        error: valide.error.format(),
      });
    }

    try {
      // Appeler le service de création utilisateur avec les données validées
      const userValid = await UtilisateurController.userSer.create(valide.data);
      return res.status(201).json(userValid);
    } catch (error) {
      // Gestion d'erreur Prisma pour les conflits de clé unique
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          let conflictedFields = "champ(s) unique(s)";
          if (error.meta && error.meta.target) {
            if (Array.isArray(error.meta.target)) {
              conflictedFields = error.meta.target.join(", ");
            } else if (typeof error.meta.target === "string") {
              conflictedFields = error.meta.target;
            }
          }
          return res.status(409).json({
            message: `Conflit : un utilisateur avec ce(s) ${conflictedFields} existe déjà.`,
            details: error.meta,
          });
        }
      }
      // Autres erreurs serveur
      return res.status(500).json({ message: "Erreur serveur", error });
    }
  }

  static findAll(req: Request, res: Response) {
    return UtilisateurController.handleRequest(res, () => {
      return UtilisateurController.userSer.findAll(req);
    });
  }

  static findById(req: Request, res: Response) {
    return UtilisateurController.handleRequest(res, () => {
      const id = Number(req.params.id);
      return UtilisateurController.userSer.findById(id);
    });
  }

  static update(req: Request, res: Response) {
    return UtilisateurController.handleRequest(res, () => {
      const id = Number(req.params.id);
      const data = req.body;
      return UtilisateurController.userSer.update(id, data);
    });
  }

  static delete(req: Request, res: Response) {
    return UtilisateurController.handleRequest(res, () => {
      const id = Number(req.params.id);
      return UtilisateurController.userSer.delete(id);
    });
  }

  static async login(req: Request, res: Response) {
    try {
      const valide = loginSchema.safeParse(req.body);
      const user = req.body;
      if (!valide.success)
        return res
          .status(400)
          .json({ message: "Erreur Connexion", error: valide.error.format() });
      const userValid = await UtilisateurController.userSer.login(user);
      const refreshToken = userValid.refreshtoken;
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      const userToken = userValid.user;
      const token = userValid.token;
      const { id, nom, prenom , photo} = userToken;
      res
        .status(200)
        .json({
          message: "Connexion Reussi",
          user: { id, nom, prenom, photo },
          token,
        });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async refresh(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({ message: "Pas de refresh token" });
      }

      const decoded: any = JWT.verify(refreshToken, env.jwtRefresh);

      const accessToken = JWT.sign(
        { id: decoded.id, email: decoded.email },
        env.jwt,
        { expiresIn: "1h" }
      );

      res.json({ accessToken });
    } catch (err: any) {
      res.status(403).json({ message: "Refresh token invalide ou expiré" });
    }
  }
}
