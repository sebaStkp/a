import { Router } from "express";
import { getSnacks, agregarSnacks } from "../controllers/snacks.controller.js";


const router = Router();
router.post('/snacks', agregarSnacks);
router.get('/snacks', getSnacks)
export default router