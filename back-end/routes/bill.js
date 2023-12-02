import express from "express"
import { createProduct, deleteProduct, listProduct, listProductDetail, updateProduct } from "../controllers/bill";
import { userById } from "../controllers/user";
import { checkAuth, isAdmin, isAuth, requiredSignin } from "../middlewares/checkAuth";
const router = express.Router();


router.get('/bill',listProduct)
router.get('/bill/:id',listProductDetail)
router.post('/bill/:userId',requiredSignin, isAuth, isAdmin, createProduct)
router.delete('/bill/:id',deleteProduct)
router.put('/bill/:id',updateProduct)

router.param("userId",userById)

export default router;