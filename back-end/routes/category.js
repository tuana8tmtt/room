import express from "express";
import { createCategory, deleteCategory, listCategory, listCategoryDetail, updateCategory, listCategoryById } from "../controllers/category";
const router = express.Router();

router.post("/category",createCategory)
router.get("/category",listCategory)
router.get("/category/:id",listCategoryDetail)
router.get("/category/get/:id",listCategoryById)
router.delete("/category/:id",deleteCategory)
router.put("/category/:id",updateCategory)

export default router

