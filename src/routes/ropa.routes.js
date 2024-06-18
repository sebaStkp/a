import { Router } from "express";
import { getRopa, agregarRopa, actualizarRopa, eliminarRopa

 } from "../controllers/ropa.controller.js";


const router = Router();
router.post('/ropa', agregarRopa);
router.get('/ropa', getRopa);
router.put('/ropa/:id', actualizarRopa); 
router.delete('/ropa/:id', eliminarRopa);
export default router