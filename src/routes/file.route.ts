import { Router } from 'express';
import fileController from "../controllers/file.controller";

const router = Router();

router.post('/', (req,res) => fileController.upload(req,res));

export default router;