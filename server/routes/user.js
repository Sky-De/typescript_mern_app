import { Router } from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import { userAuth, userOwnerAuth } from "../middleware/userAuth.js";
import {
  bookMarkPost,
  deleteUser,
  getPostOwnerInfo,
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
  sendVerifyEmail,
  updateUser,
  updateUserPassword,
  verifyUser,
  googleAuth,
} from "../controllers/user.js";

const router = Router();

router.get("/users", adminAuth, getUsers);
router.get("/:id/name", getPostOwnerInfo);
router.get("/:id/verify/email", sendVerifyEmail);

// AUTH
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/googleAuth", googleAuth);

// ACTIONS
router.put("/:id/update", userOwnerAuth, updateUser);
router.post("/:id/verify", userOwnerAuth, verifyUser);
router.patch("/:id/update/password", userOwnerAuth, updateUserPassword);
router.delete("/:id/delete", userOwnerAuth, deleteUser);
router.patch("/:id/bookmark", userAuth, bookMarkPost);

export default router;
