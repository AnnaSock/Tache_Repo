import { Permission } from "@prisma/client";
import { prisma } from "../config/prisma.js";

export class PermissionRepository {
  async findByProp(data: Omit<Permission, "id">) {
    return await prisma.permission.findFirst({
      where: {
        utilisateurId: data.utilisateurId,
        tacheId: data.tacheId,
        typePermission: data.typePermission,
      },
    });
  }

  async create(data: Omit<Permission, "id">): Promise<Permission> {
    return await prisma.permission.create({
      data: {
        utilisateurId: data.utilisateurId,
        tacheId: data.tacheId,
        typePermission: data.typePermission,
      },
    });
  }

  async delete(data: Omit<Permission, "id">): Promise<Permission | null> {
    const permission = await this.findByProp(data);
    if (!permission) return null;

    return await prisma.permission.delete({
      where: { id: permission.id },
    });
  }

  async findAll(): Promise<Permission[]> {
    return await prisma.permission.findMany();
  }
}
