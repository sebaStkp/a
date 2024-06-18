import { Router } from "express";
import { getMedicina, agregarMedicina, actualizarSaludMedicamento, eliminarSaludMedicamento } from "../controllers/salud.controller.js";


const router = Router();
router.post('/medicamentos', agregarMedicina);
router.get('/medicamentos', getMedicina)
router.put('/medicamentos/:id', actualizarSaludMedicamento);
router.delete('/medicamentos/:id', eliminarSaludMedicamento);
export default router