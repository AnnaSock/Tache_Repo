import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { uploadFile } from '../controllers/UploadController.js';

const uploadRoutes = Router();

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

uploadRoutes.post('/file', upload.single('photo'), uploadFile);

export default uploadRoutes;
