import fs from "fs";
import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import { VOLUME_PATH } from "../../../../utils/env.ts";

const router = express.Router();

// Pastikan direktori upload tersedia
if (!fs.existsSync(VOLUME_PATH)) {
  fs.mkdirSync(VOLUME_PATH, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, VOLUME_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/", (req: Request, res: Response): void => {
  const key = req.query.key as string;
  if (!key) {
    // List all files in the volume directory with clickable links
    fs.readdir(VOLUME_PATH, (err, files) => {
      if (err) {
        res.status(500).json({ message: "Error reading directory" });
        return;
      }
      const fileLinks = files.map(file => ({
        name: file,
        url: `/api/multer?key=${file}`
      }));
      res.json(fileLinks);
    });
    return;
  }

  const filePath = `${VOLUME_PATH}/${key}`;

  if (!fs.existsSync(filePath)) {
    res.status(404).json({ message: "File not found" });
    return;
  }

  res.sendFile(filePath);
});

router.post("/", upload.single("file"), (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }
  res.json({ message: "File uploaded successfully", filename: req.file.filename });
});

export default router;
