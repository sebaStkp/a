import { Router } from "express";
import { getHogar} from "../controllers/hogar.controller.js";


const router = Router();
router.get('/hogar', getHogar)
export default router