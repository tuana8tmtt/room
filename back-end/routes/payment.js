import express from "express"
import { createProduct, deleteProduct, listProduct, listProductDetail, updateProduct } from "../controllers/payment";
import { userById } from "../controllers/user";
import { checkAuth, isAdmin, isAuth, requiredSignin } from "../middlewares/checkAuth";
const router = express.Router();


router.get('/payment',listProduct)
router.get('/payment/:id',listProductDetail)
router.post('/payment/:userId',requiredSignin, isAuth, isAdmin, createProduct)
router.delete('/payment/:id',deleteProduct)
router.put('/payment/:id',updateProduct)

router.param("userId",userById)

export default router;