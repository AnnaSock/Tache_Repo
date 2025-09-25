import { Router } from "express";
import { TacheController } from "../controllers/TacheController.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";
import multer from "multer";
import path from "path";

// Configurer le dossier de stockage et le nom des fichiers uploadés
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // dossier où les fichiers seront stockés
  },
  filename: function (req, file, cb) {
    // Générer un nom unique pour éviter collisions
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).fields([
  { name: "audio", maxCount: 1 },
  { name: "image", maxCount: 1 }
]);

const tacheRoute = Router();
const tacheController = new TacheController();

tacheRoute.post("/",upload, TacheController.create.bind(tacheController));
tacheRoute.get("/", TacheController.findAll.bind(tacheController));
tacheRoute.get("/:id", TacheController.findById.bind(tacheController));
tacheRoute.put(
  "/:id",
  AuthMiddleware.autorizate,
  TacheController.update.bind(tacheController)
);
tacheRoute.delete(
  "/:id",
  AuthMiddleware.autorizate,
  TacheController.delete.bind(tacheController)
);

tacheRoute.get("/user", TacheController.findAllByUserId.bind(tacheController));

export default tacheRoute;
