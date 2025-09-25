import { NextFunction, Response } from "express";
import { TacheService } from "../services/TacheService.js";
import { AuthRequest } from "./authentificate.js";
import { PermissionService } from "../services/PermissionService.js";
import { TypePermission } from "@prisma/client";

export class AuthMiddleware {
  private static tacheService: TacheService = new TacheService();
  private static permissionService: PermissionService = new PermissionService();

  static async autorizate(req: AuthRequest, res: Response, next: NextFunction) {
    const tacheId = Number(req.params.id);
    const tache = await AuthMiddleware.tacheService.findById(tacheId);
    const user = req.user;
    const utilisateurId = Number(user?.id);

    if (!tache) {
      return res.status(404).json({ message: "Tâche introuvable" });
    }

    if (tache.utilisateurId === utilisateurId) {
      return next();
    }

    const typePermission =
      req.method === "PUT" ? TypePermission.MODIFIER : TypePermission.SUPPRIMER;

    const permission = await AuthMiddleware.permissionService.findPermission({
      utilisateurId,
      tacheId,
      typePermission,
    });

    if (!permission) {
      return res
        .status(403)
        .json({ message: "Accès refusé : permission manquante" });
    }

    next();
  }
}
