import { Router } from "express";
import { getCarnes_completo, agregarCarne, actualizarCarne, eliminarCarne} from "../controllers/carnes.controller.js";


const router = Router();
router.post('/carnes', agregarCarne);
router.get('/carnes', getCarnes_completo);
router.put('/carnes/:id', actualizarCarne); // Ruta para actualizar
router.delete('/carnes/:id', eliminarCarne); // Ruta para eliminar

export default router