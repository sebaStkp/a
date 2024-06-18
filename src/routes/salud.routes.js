import { Router } from "express";
import { getMedicina, agregarMedicina, actualizarSaludMedicamento, eliminarSaludMedicamento, getMed } from "../controllers/salud.controller.js";


const router = Router();
router.post('/medicamentos', agregarMedicina);
router.get('/medicamentos', getMedicina);
router.get('/medicamentos/:id', getMed);
router.put('/medicamentos/:id', actualizarSaludMedicamento);
router.delete('/medicamentos/:id', eliminarSaludMedicamento);
export default router