import { Router } from "express";
import { getLacteos} from "../controllers/lacteos,controller.js";


const router = Router();
router.get('/lacteos', getLacteos)
export default router