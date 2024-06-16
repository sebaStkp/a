import { Router } from "express";
import { getRopa } from "../controllers/ropa.controller.js";


const router = Router();
router.get('/ropa', getRopa)
export default router