import { Router } from "express";
import { getSnacks, agregarSnacks, actualizarSnack, eliminarSnack } from "../controllers/snacks.controller.js";


const router = Router();
router.post('/snacks', agregarSnacks);
router.get('/snacks', getSnacks);
router.put('/snacks/:id', actualizarSnack); 
router.delete('/snacks/:id', eliminarSnack);
export default router