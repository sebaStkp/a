import { Router } from "express";
import { getFrutas_verduras} from "../controllers/frutas_verduras.controller.js";


const router = Router();
router.get('/frutas_verduras', getFrutas_verduras)
export default router