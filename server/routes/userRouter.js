import { Router } from "express";
import { signUpUser,signInUser } from '../controllers/UserController.js';

const router = Router();

router.post("/signup", signUpUser);

router.post("/signin", signInUser);

export default router;
