import { Router } from "express";
import { createBook, getBooks } from "../controllers/book.js";


const router = Router();


router.get("/", getBooks);
router.post("/", createBook);
// router.get("/:id", getBooks);

export default router;