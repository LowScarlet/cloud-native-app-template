import express from "express";
import multer from "./multer/routes.ts";
import ping from "./ping/routes.ts";

const router = express.Router();

router.use('/ping', ping);
router.use('/multer', multer);

export default router;