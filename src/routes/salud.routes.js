import { Router } from "express";
import { getMedicina, agregarMedicina } from "../controllers/salud.controller.js";


const router = Router();
router.post('/medicamentos', agregarMedicina);
router.get('/medicamentos', getMedicina)
export default router