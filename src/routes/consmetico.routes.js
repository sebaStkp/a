import { Router } from "express";
import { getCosmeticos_completo} from "../controllers/cosmeticos.controller.js";


const router = Router();
router.get('/cosmeticos', getCosmeticos_completo)
export default router