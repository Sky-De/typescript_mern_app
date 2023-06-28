import { Router } from "express";
import { getUsers, loginUser, registerUser, updateUser } from "../controllers/auth.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { userAuth } from "../middleware/userAuth.js";


const router = Router();


router.get("/user", adminAuth, getUsers);


router.post("/register", registerUser);
router.post("/login", loginUser);

router.patch("/user", userAuth, updateUser);

export default router;