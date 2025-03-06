import express from "express";
import multer from "./multer/routes.ts";
import ping from "./ping/routes.ts";
import db from "./db/routes.ts";

const router = express.Router();

router.use('/db', db);
router.use('/ping', ping);
router.use('/multer', multer);

export default router;