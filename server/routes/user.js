import { Router } from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import { userAuth, userOwnerAuth } from "../middleware/userAuth.js";
import { 
    bookMarkPost,
    deleteUser, 
    getUsers, 
    loginUser, 
    registerUser, 
    updateUser, 
    updateUserPassword
} from "../controllers/user.js";


const router = Router();


router.get("/users", adminAuth, getUsers);

// AUTH
router.post("/register", registerUser);
router.post("/login", loginUser);

// ACTIONS
router.patch("/update", userOwnerAuth, updateUser);
router.patch("/update/password", userOwnerAuth, updateUserPassword);
router.delete("/delete", userOwnerAuth, deleteUser);
router.patch("/:id/bookmark", userAuth ,bookMarkPost);

export default router;