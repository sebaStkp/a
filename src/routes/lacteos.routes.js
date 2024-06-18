import { Router } from "express";
import { getLacteos, agregarLacteos, actualizarLacteo, eliminarLacteo} from "../controllers/lacteos,controller.js";


const router = Router();
router.post('/lacteos', agregarLacteos);
router.get('/lacteos', getLacteos);
router.put('/lacteos/:id', actualizarLacteo); // Ruta para actualizar
router.delete('/lacteos/:id', eliminarLacteo); // Ruta para eliminar
export default router