import { Taches, Etat, Prisma } from "@prisma/client";
import { IRepository } from "./IRepository.js";
import { prisma } from "../config/prisma.js";
export class TacheRepository implements IRepository<Taches> {


  async findAll(): Promise<Taches[]> {
  return await prisma.taches.findMany({
    include: {
      utilisateur: true,
    },
  });
}


  async findById(id: number): Promise<Taches | null> {

    if (!id) {
    throw new Error("L'id est manquant pour findById");
  }
    return await prisma.taches.findUnique({
      where: { id },
    });
  }

 async create(data: Omit<Taches, "id">): Promise<Taches> {
  // Nettoyage pour convertir undefined en null sur les champs optionnels
  const cleanedData = {
    titre: data.titre,
    description: data.description,
    statut: data.statut,
    audioPath: data.audioPath === undefined ? null : data.audioPath,
    dateDebut: data.dateDebut === undefined ? null : data.dateDebut,
    dateFin: data.dateFin === undefined ? null : data.dateFin,
    utilisateur: {
      connect: { id: data.utilisateurId }
    },
  };

  return await prisma.taches.create({
    data: cleanedData,
  });
}


  async update(id: number, data: Partial<Omit<Taches, "id">>): Promise<Taches> {
    return await prisma.taches.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.taches.delete({
      where: { id },
    });
  }

  async findAllByUserId(userId: number): Promise<Taches[]> {
  return await prisma.taches.findMany({
    where: { utilisateurId: userId },
    include: {
      utilisateur: true,
    },
  });
}

}
