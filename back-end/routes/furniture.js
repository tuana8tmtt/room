import express from "express"
import { createProduct, deleteProduct, listProduct, listProductDetail, updateProduct } from "../controllers/furniture";
import { userById } from "../controllers/user";
import { checkAuth, isAdmin, isAuth, requiredSignin } from "../middlewares/checkAuth";
const router = express.Router();


router.get('/furniture',listProduct)
router.get('/furniture/:id',listProductDetail)
router.post('/furniture/:userId',requiredSignin, isAuth, isAdmin, createProduct)
router.delete('/furniture/:id',deleteProduct)
router.put('/furniture/:id',updateProduct)

router.param("userId",userById)

export default router;