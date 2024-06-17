import { Router } from "express";
import { getCosmeticos_completo, agregarCosmetico} from "../controllers/cosmeticos.controller.js";


const router = Router();
router.post('/cosmeticos', agregarCosmetico);
router.get('/cosmeticos', getCosmeticos_completo)
export default router