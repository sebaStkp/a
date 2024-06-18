import { Router } from "express";
import { getSnacks, agregarSnacks, actualizarSnack, eliminarSnack, getSnack } from "../controllers/snacks.controller.js";


const router = Router();
router.post('/snacks', agregarSnacks);
router.get('/snacks', getSnacks);
router.get('/snacks/:id', getSnack);
router.put('/snacks/:id', actualizarSnack); 
router.delete('/snacks/:id', eliminarSnack);
export default router