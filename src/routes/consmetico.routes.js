import { Router } from "express";
import { getCosmeticos_completo, agregarCosmetico, actualizarCosmetico, eliminarCosmetico} from "../controllers/cosmeticos.controller.js";


const router = Router();
router.post('/cosmeticos', agregarCosmetico);
router.get('/cosmeticos', getCosmeticos_completo);
router.put('/cosmeticos/:id', actualizarCosmetico); // Ruta para actualizar
router.delete('/cosmeticos/:id', eliminarCosmetico); // Ruta para eliminar
export default router