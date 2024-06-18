import { Router } from "express";
import { getFrutas_verduras, agregarFrutaVerdura, actualizarFrutaVerdura, eliminarFrutaVerdura, getFruta} from "../controllers/frutas_verduras.controller.js";


const router = Router();
router.post('/frutas_verduras', agregarFrutaVerdura);
router.get('/frutas_verduras', getFrutas_verduras);
router.get('/frutas_verduras/:id', getFruta);
router.put('/frutas_verduras/:id', actualizarFrutaVerdura); 
router.delete('/frutas_verduras/:id', eliminarFrutaVerdura);
export default router