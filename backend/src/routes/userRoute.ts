import { Router } from "express";
import { protectRoute } from "../middleware/auth";
import { getUsers } from "../controllers/userController";

const router = Router();

// /api/users
router.get("/", protectRoute, getUsers);

export default router;