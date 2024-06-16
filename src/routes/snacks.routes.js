import { Router } from "express";
import { getSnacks } from "../controllers/snacks.controller.js";


const router = Router();
router.get('/snacks', getSnacks)
export default router