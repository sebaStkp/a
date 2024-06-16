import { Router } from "express";
import { getBebidas_completo} from "../controllers/bebidas.controller.js";


const router = Router();
router.get('/bebidas', getBebidas_completo)

export default router