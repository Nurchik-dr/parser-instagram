import { Router } from "express";
import {
  analyzeFromUrl,
  getFeedHandler,
  analyzeText
} from "../controllers/feed.controller";

const router = Router();

router.post("/analyze", analyzeFromUrl);
router.post("/analyze-text", analyzeText);
router.get("/", getFeedHandler);

export default router;
