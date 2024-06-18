import { Router } from "express";
import { getBebidas_completo, agregarBebida, actualizarBebida, eliminarBebida} from "../controllers/bebidas.controller.js";


const router = Router();
router.post('/bebidas', agregarBebida);
router.get('/bebidas', getBebidas_completo);
router.put('/bebidas/:id', actualizarBebida); 
router.delete('/bebidas/:id', eliminarBebida);

export default router