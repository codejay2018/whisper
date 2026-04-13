import { Router } from "express";
import { authCallback, getMe } from "../controllers/authController";
import { protectRoute } from "../middleware/auth";

const router = Router();

// /api/auth/me - Get current user info
router.get("/me", protectRoute, getMe);

// /api/auth/callback - Handle authentication callback from Clerk
router.post("/callback", authCallback);

export default router;