import express from "express";
import { getGigs, createGig } from "../controllers/gig.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ PUBLIC: browse gigs
router.get("/", getGigs);

// 🔒 PROTECTED: post a gig (req.user REQUIRED)
router.post("/", protect, createGig);

export default router;
