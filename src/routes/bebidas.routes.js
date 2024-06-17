import { Router } from "express";
import { getBebidas_completo, agregarBebida} from "../controllers/bebidas.controller.js";


const router = Router();
router.post('/bebidas', agregarBebida);
router.get('/bebidas', getBebidas_completo)

export default router