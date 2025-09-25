import { Router } from "express";
import { PermissionController } from "../controllers/PermissionController.js";

const permissionRoute = Router();

permissionRoute.get("/", PermissionController.getAll as any);
permissionRoute.post("/", PermissionController.create);
permissionRoute.delete("/", PermissionController.deletePermission)

export default permissionRoute;
