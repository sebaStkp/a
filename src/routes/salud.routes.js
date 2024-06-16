import { Router } from "express";
import { getMedicina } from "../controllers/salud.controller.js";


const router = Router();
router.get('/medicamentos', getMedicina)
export default router