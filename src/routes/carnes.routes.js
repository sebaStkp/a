import { Router } from "express";
import { getCarnes_completo } from "../controllers/carnes.controller.js";


const router = Router();
router.get('/carnes', getCarnes_completo)

export default router