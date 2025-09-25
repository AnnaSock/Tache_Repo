import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import { env } from "../config/env.js";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

export function authentificate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const bearerToken = req.headers.authorization;

  try {
    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      res.status(401).json({ message: "Token is missing" });
      return;
    }

    const token = bearerToken.split(" ")[1];
    const secret = env.jwt as string;

    if (!secret) {
      res.status(401).json({ message: "Clé secrete introuvable" });
      return;
    }

    const payload = JWT.verify(token as string, secret) as any;

    req.user = {
      id:
        typeof payload.id === "string" ? parseInt(payload.id, 10) : payload.id,
      email: payload.email,
    };

    next();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export default authentificate;
