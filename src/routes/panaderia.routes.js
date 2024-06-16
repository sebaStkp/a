import { Router } from "express";
import { getPanaderia } from "../controllers/panaderia.controller.js";


const router = Router();
router.get('/panaderia', getPanaderia)
export default router