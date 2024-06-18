import { Router } from "express";
import { getFrutas_verduras, agregarFrutaVerdura, actualizarFrutaVerdura, eliminarFrutaVerdura} from "../controllers/frutas_verduras.controller.js";


const router = Router();
router.post('/frutas_verduras', agregarFrutaVerdura);
router.get('/frutas_verduras', getFrutas_verduras);
router.put('/frutas_verduras/:id', actualizarFrutaVerdura); // Ruta para actualizar
router.delete('/frutas_verduras/:id', eliminarFrutaVerdura); // Ruta para eliminar
export default router