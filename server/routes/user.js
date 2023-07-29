import { Router } from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import { userAuth, userOwnerAuth } from "../middleware/userAuth.js";
import { 
    bookMarkPost,
    deleteUser, 
    getUsers, 
    loginUser, 
    logoutUser, 
    registerUser, 
    updateUser, 
    updateUserPassword
} from "../controllers/user.js";


const router = Router();


router.get("/users", adminAuth, getUsers);

// AUTH
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// ACTIONS
router.put("/:id/update", userOwnerAuth, updateUser);
router.patch("/:id/update/password", userOwnerAuth, updateUserPassword);
router.delete("/:id/delete", userOwnerAuth, deleteUser);
router.patch("/:id/bookmark", userAuth ,bookMarkPost);

export default router;