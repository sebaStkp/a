import { Router } from "express";
import { getHogar, agregarHogar} from "../controllers/hogar.controller.js";


const router = Router();
router.post('/hogar', agregarHogar);
router.get('/hogar', getHogar)
export default router