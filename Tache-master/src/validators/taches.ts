import { z } from "zod";

export const TacheSchema = z.object({
  titre: z.string().min(1, "Tache requis"),
  description: z.string().min(1, "Description requis"),
  statut: z.enum(["EN_COURS", "TERMINER", "A_FAIRE"]).default("EN_COURS"),
  audioPath: z.string().nullable().optional(),
  image: z.string().min(1, "Image requis").optional().nullable(),
  dateDebut: z.preprocess(
    (arg) => arg == null ? null : new Date(arg as string),
    z.date().nullable().optional()
  ),
  dateFin: z.preprocess(
    (arg) => arg == null ? null : new Date(arg as string),
    z.date().nullable().optional()
  ),
});
