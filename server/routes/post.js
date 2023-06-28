import { Router } from "express";
import { createPost, deletePost, getUserBookMarks, getPost, getPosts, getUserPosts, test, updatePost, bookMarkPost, likePost } from "../controllers/post.js";
import { postOwnerAuth, userAuth } from "../middleware/userAuth.js";


const router = Router();
router.get("/test", test);

router.get("/",  getPosts);
router.get("/user/posts", userAuth, getUserPosts);
router.get("/bookmarks", userAuth ,getUserBookMarks);
router.post("/", userAuth, createPost);
router.patch("/bookmarks/:id", userAuth ,bookMarkPost);
router.patch("/:id/like", userAuth, likePost);
router.get("/:id", getPost);
router.patch("/:id", postOwnerAuth, updatePost);
router.delete("/:id", postOwnerAuth, deletePost);



export default router;