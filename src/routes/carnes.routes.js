import { Router } from "express";
import { getCarnes_completo, agregarCarne} from "../controllers/carnes.controller.js";


const router = Router();
router.post('/carnes', agregarCarne);
router.get('/carnes', getCarnes_completo)

export default router