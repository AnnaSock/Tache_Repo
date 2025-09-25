import { Request, Response } from 'express';

export const uploadFile = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucun fichier uploadé' });
  }
  res.json({
    message: 'Upload réussi',
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
  });
};
