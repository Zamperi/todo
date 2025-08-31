import { auth } from "../helper/auth.js";
import {Router} from "express";
import { deleteTask, getTasks, postTask } from "../controllers/TaskController.js";

const router = Router();

router.get(`/`, getTasks);

router.post(`/create`, auth, postTask);

router.delete(`/delete/:id`, deleteTask);

export default router;