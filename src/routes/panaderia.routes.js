import { Router } from "express";
import { getPanaderia, agregarPanaderia, actualizarPanaderia, eliminarPanaderia, getPan } from "../controllers/panaderia.controller.js";


const router = Router();
router.post('/panaderia', agregarPanaderia);
router.get('/panaderia', getPanaderia);
router.get('/panaderia/:id', getPan);
router.put('/panaderia/:id', actualizarPanaderia); // Ruta para actualizar
router.delete('/panaderia/:id', eliminarPanaderia); // Ruta para eliminar
export default router