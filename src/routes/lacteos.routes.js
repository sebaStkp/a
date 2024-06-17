import { Router } from "express";
import { getLacteos, agregarLacteos} from "../controllers/lacteos,controller.js";


const router = Router();
router.post('/lacteos', agregarLacteos);
router.get('/lacteos', getLacteos)
export default router