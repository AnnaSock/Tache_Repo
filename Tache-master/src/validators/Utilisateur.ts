import zod from "zod";

export const utilisateurSchema = zod.object({
  nom: zod.string().min(1, "Le nom est requis"),
  prenom: zod.string().min(1, "Le prénom est requis"),
  email: zod.string().email("Ceci n'est pas un email valide"),
  adresse: zod.string().optional().or(zod.literal("")).default(""), // adresse optionnelle mais toujours string
  login: zod.string().min(1, "Le login est requis"),
  photo: zod.string().min(1, "La photo est requise"), // chemin vers le fichier uploadé, requise
  password: zod.string().min(1, "Le mot de passe est requis"),
  telephone: zod.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    zod.number().min(1, "Le téléphone est requis")
  ), // accepte chaine ou nombre, transforme en number
  genre: zod.enum(["HOMME", "FEMME"]),
});

export const loginSchema = zod.object({
  email: zod.string().email("Ceci n'est pas un email valide"),
  password: zod.string().min(1, "le password est requis"),
});
