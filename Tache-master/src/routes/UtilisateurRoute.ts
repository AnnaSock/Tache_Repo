import { Router } from "express";
import { UtilisateurController } from "../controllers/UtilisateurController.js";

const userRoute = Router();
const utilisateurController = new UtilisateurController();

import multer from 'multer';
import path from 'path';

// Config Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // dossier de stockage
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

userRoute.post("/", upload.single('photo'), UtilisateurController.create.bind(utilisateurController));

userRoute.post(
  "/login",
  UtilisateurController.login.bind(utilisateurController)
);
userRoute.post(
  "/refresh",
  UtilisateurController.refresh.bind(utilisateurController)
);

userRoute.get("/", UtilisateurController.findAll.bind(utilisateurController));
userRoute.get(
  "/:id",
  UtilisateurController.findById.bind(utilisateurController)
);
userRoute.put("/:id", UtilisateurController.update.bind(utilisateurController));
userRoute.delete(
  "/:id",
  UtilisateurController.delete.bind(utilisateurController)
);
export default userRoute;
