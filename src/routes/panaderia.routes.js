import { Router } from "express";
import { getPanaderia, agregarPanaderia } from "../controllers/panaderia.controller.js";


const router = Router();
router.post('/panaderia', agregarPanaderia);
router.get('/panaderia', getPanaderia)
export default router