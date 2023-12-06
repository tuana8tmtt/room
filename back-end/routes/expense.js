import express from "express"
import { createProduct, deleteProduct, listProduct, listProductDetail, updateProduct } from "../controllers/expense";
import { userById } from "../controllers/user";
import { checkAuth, isAdmin, isAuth, requiredSignin } from "../middlewares/checkAuth";
const router = express.Router();


router.get('/expense',listProduct)
router.get('/expense/:id',listProductDetail)
router.post('/expense/:userId',requiredSignin, isAuth, isAdmin, createProduct)
router.delete('/expense/:id',deleteProduct)
router.put('/expense/:id',updateProduct)

router.param("userId",userById)

export default router;