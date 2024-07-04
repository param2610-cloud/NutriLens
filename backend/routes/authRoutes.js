import express from "express";

import {register,login} from '../controllers/authController.js'
import { auth } from "../middleware/auth.js";
const router = express.Router();
router.use(express.json());
router.post('/register', register);
router.post('/login', login);
router.post('/verify-token', auth);
export default router;
