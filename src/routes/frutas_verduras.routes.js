import { Router } from "express";
import { getFrutas_verduras, agregarFrutaVerdura} from "../controllers/frutas_verduras.controller.js";


const router = Router();
router.post('/frutas_verduras', agregarFrutaVerdura);
router.get('/frutas_verduras', getFrutas_verduras)
export default router