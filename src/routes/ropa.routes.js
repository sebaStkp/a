import { Router } from "express";
import { getRopa, agregarRopa } from "../controllers/ropa.controller.js";


const router = Router();
router.post('/ropa', agregarRopa);
router.get('/ropa', getRopa)
export default router