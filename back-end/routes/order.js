import express from "express";
import { addOrder, deleteOrder, listOrder, listOrderDetail, updateOrder } from "../controllers/order";
const router = express.Router();

router.post("/order",addOrder)
router.get("/order",listOrder)
router.get("/order/:id",listOrderDetail)
router.delete("/order/:id",deleteOrder)
router.put("/order/:id",updateOrder)

export default router

