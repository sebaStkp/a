import { Router } from "express";
import { getCarnes_completo, agregarCarne, actualizarCarne, eliminarCarne, getCarne} from "../controllers/carnes.controller.js";


const router = Router();
router.post('/carnes', agregarCarne);
router.get('/carnes', getCarnes_completo);
router.get('/carnes/:id', getCarne);
router.put('/carnes/:id', actualizarCarne); 
router.delete('/carnes/:id', eliminarCarne);

export default router