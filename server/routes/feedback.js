import { Router } from "express";
import { userAuth } from "../middleware/userAuth.js";
import {
  createFeedback,
  deleteFeedback,
  getFeedbacks,
} from "../controllers/feedback.js";

const router = Router();

router.get("/feedbacks", getFeedbacks);
router.post("/create", userAuth, createFeedback);
router.delete("/:id/delete", userAuth, deleteFeedback);

export default router;
