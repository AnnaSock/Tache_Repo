import { Taches } from "@prisma/client";
import { TacheRepository } from "../repositories/TacheRepository.js";
import { Request } from "express";

export class TacheService {
  private tacheRepo: TacheRepository = new TacheRepository();

  async create(
    data: Omit<Taches, "id"> & { utilisateurId: number }
  ): Promise<Taches> {
    if (!data.utilisateurId) {
      throw new Error("UtilisateurId manquant pour la création de la tâche");
    }

    // Nettoyage des champs optionnels pour éviter undefined
    const cleanedData = {
      titre: data.titre,
      description: data.description,
      statut: data.statut ?? "EN_COURS",
      audioPath: data.audioPath === undefined ? null : data.audioPath,
      image: data.image === undefined ? null : data.audioPath,
      dateDebut: data.dateDebut === undefined ? null : data.dateDebut,
      dateFin: data.dateFin === undefined ? null : data.dateFin,
      utilisateurId: data.utilisateurId,
    };

    return await this.tacheRepo.create(cleanedData);
  }

  async findAll(req: Request): Promise<Taches[]> {
    const taches = await this.tacheRepo.findAll();
    taches.forEach((tache) => {
      console.log();
      if (tache.audioPath && tache.image) {
        tache.audioPath = `${req.protocol}://${req.get("host")}/${
          tache.audioPath
        }`;
        tache.image= `${req.protocol}://${req.get("host")}/uploads/${
          tache.image
        }`
      }
    });
    return taches;
  }

  async findById(id: number): Promise<Taches | null> {
    return this.tacheRepo.findById(id);
  }

  async update(id: number, data: Partial<Omit<Taches, "id">>): Promise<Taches> {
    return this.tacheRepo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.tacheRepo.delete(id);
  }

  async findAllByUserId(userId: number): Promise<Taches[]> {
    return await this.tacheRepo.findAllByUserId(userId);
  }
}
