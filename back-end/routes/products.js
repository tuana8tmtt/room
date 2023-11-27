import express from "express"
import { createProduct, deleteProduct, listProduct, listProductDetail, updateProduct } from "../controllers/products";
import { userById } from "../controllers/user";
import { checkAuth, isAdmin, isAuth, requiredSignin } from "../middlewares/checkAuth";
const router = express.Router();


router.get('/rooms',listProduct)
router.get('/rooms/:id',listProductDetail)
router.post('/rooms/:userId',requiredSignin, isAuth, isAdmin, createProduct)
router.delete('/rooms/:id',deleteProduct)
router.put('/rooms/:id',updateProduct)

router.param("userId",userById)

export default router;