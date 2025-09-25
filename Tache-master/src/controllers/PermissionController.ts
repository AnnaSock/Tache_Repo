import { Response } from "express";
import { AuthRequest } from "../middlewares/authentificate";
import { PermissionService } from "../services/PermissionService.js";
import { Permission, TypePermission } from "@prisma/client";
import { typeCreatePerm } from "../types/typePermission";

export class PermissionController {
private static permissionService = new PermissionService();

  static async create(req: AuthRequest, res: Response) {
    try {
      const connectId = req.user?.id;
      const { utilisateurId, tacheId, typePermission } = req.body;

      if (!connectId) {
        return res.status(401).json({ message: "Non authentifié" });
      }

      const permission = await PermissionController.permissionService.create({
          connectId,
          utilisateurId,
          tacheId,
          typePermission: typePermission as TypePermission
     });

      res.status(201).json({ status: "success", data: permission });
    } catch (error: any) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }    // Supprimer la permission


  static async deletePermission(req: AuthRequest, res: Response){
    try {
      const connectId = req.user?.id; // utilisateur connecté
      const { utilisateurId, tacheId, typePermission } = req.body;

      if (!connectId) {
        return res.status(401).json({ message: "Non authentifié" });
      }

      // Appel du service
      const deleted = await PermissionController.permissionService.delete({
        connectId,
        utilisateurId,
        tacheId,
        typePermission
      });

      if (!deleted) {
        return res.status(404).json({ message: "Permission non trouvée" });
      }

      res.status(200).json({ status: "success", data: deleted });
    } catch (error: any) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  static async getAll(req: Request, res: Response): Promise<void>{
    try {
      const permissions = await PermissionController.permissionService.getAll();
      res.status(200).json(permissions);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
  




  
}
