import { TacheService } from "../services/TacheService.js";
import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authentificate.js";
import { TacheSchema } from "../validators/taches.js";
export class TacheController {
  private static tacheSer: TacheService = new TacheService();

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

  static async create(req: AuthRequest, res: Response) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Utilisateur non trouvé" });

    // Validation Zod sur req.body (champs texte)
    const tacheValide = TacheSchema.parse(req.body);

    // Recuperer audioPath depuis req.file si upload Multer
    const audioPath = req.file ? req.file.path : null;
    const image= req.file ?  req.file.path : null
    const data = {
      ...tacheValide,
      audioPath,
      image,
      dateDebut: req.body.dateDebut ? new Date(req.body.dateDebut) : null,
      dateFin: req.body.dateFin ? new Date(req.body.dateFin) : null,
      utilisateurId: user.id,
    };

    const tache = await TacheController.tacheSer.create(data);
    res.status(201).json({ status: "success", data: tache });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Erreur création", error: error.format() });
    }
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
}

static findAll(req: Request, res: Response) {
    return TacheController.handleRequest(res, () => {
      return TacheController.tacheSer.findAll(req);
    });
  }



//   static async findAll(req: Request, res: Response) {
//   return TacheController.handleRequest(res, async () => {
//     const taches = await TacheController.tacheSer.findAll();
//     taches.forEach(tache => {
//       if (tache.audioPath) {
//         tache.audioPath = `${req.protocol}://${req.get('host')}/uploads/${tache.audioPath}`;
//       }
//     });
//     return taches;
//   });
// }


  static findById(req: Request, res: Response) {
    return TacheController.handleRequest(res, () => {
      const id = Number(req.params.id);
      return TacheController.tacheSer.findById(id);
    });
  }

  static update(req: Request, res: Response) {
    return TacheController.handleRequest(res, () => {
      const id = Number(req.params.id);
      const data = req.body;
      return TacheController.tacheSer.update(id, data);
    });
  }

  static delete(req: Request, res: Response) {
    return TacheController.handleRequest(res, () => {
      const id = Number(req.params.id);
      return TacheController.tacheSer.delete(id);
    });
  }

  // static async findByUserId(req: AuthRequest, res: Response) {
  //   try {
  //     if (!req.user?.id) {
  //       return res.status(401).json({ message: "Utilisateur non authentifié" });
  //     }
  //     const userId = req.user.id;
  //     const tasks = await TacheController.tacheSer.findByUserId(userId);
  //     res.status(200).json(tasks);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Erreur serveur" });
  //   }
  // }

  static findAllByUserId(req: AuthRequest, res: Response): Promise<void> {
    return TacheController.handleRequest(res, async () => {
      if (req.user) {
        const userId = req.user.id;
        // Toujours retourner une promesse ici, pas undefined
        return await TacheController.tacheSer.findAllByUserId(userId);
      }
      // Si pas d'utilisateur, on peut lancer une erreur, ou retourner un tableau vide
      return [];
    });
  }
}
