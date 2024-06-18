import { Router } from "express";
import { getHogar, agregarHogar, actualizarHogar, eliminarHogar} from "../controllers/hogar.controller.js";


const router = Router();
router.post('/hogar', agregarHogar);
router.get('/hogar', getHogar);
router.put('/hogar/:id', actualizarHogar); // Ruta para actualizar
router.delete('/hogar/:id', eliminarHogar); // Ruta para eliminar

export default router