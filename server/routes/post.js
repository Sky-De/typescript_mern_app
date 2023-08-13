import { Router } from "express";
import { postOwnerAuth, userAuth } from "../middleware/userAuth.js";
import {
  createPost,
  deletePost,
  getUserBookMarks,
  getPost,
  getPosts,
  getUserPosts,
  updatePost,
  likePost,
  getPostsByCount,
} from "../controllers/post.js";

const router = Router();

router.get("/posts", getPosts);
router.post("/posts/counted", getPostsByCount);

router.post("/user/posts", userAuth, getUserPosts);
router.post("/user/bookmarks", userAuth, getUserBookMarks);

router.post("/create", userAuth, createPost);
router.patch("/:id/like", userAuth, likePost);
router.get("/:id", userAuth, getPost);

router.patch("/:id/update", postOwnerAuth, updatePost);
router.delete("/:id/delete", postOwnerAuth, deletePost);

export default router;
