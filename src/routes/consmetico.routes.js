import { Router } from "express";
import { getCosmeticos_completo, agregarCosmetico, actualizarCosmetico, eliminarCosmetico, getCosmetico} from "../controllers/cosmeticos.controller.js";


const router = Router();
router.post('/cosmeticos', agregarCosmetico);
router.get('/cosmeticos', getCosmeticos_completo);
router.get('/cosmeticos/:id', getCosmetico);
router.put('/cosmeticos/:id', actualizarCosmetico); 
router.delete('/cosmeticos/:id', eliminarCosmetico);
export default router