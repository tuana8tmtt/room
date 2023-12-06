import express from "express"
import { createProduct, deleteProduct, listProduct, listProductDetail, updateProduct } from "../controllers/revenue";
import { userById } from "../controllers/user";
import { checkAuth, isAdmin, isAuth, requiredSignin } from "../middlewares/checkAuth";
const router = express.Router();


router.get('/revenue',listProduct)
router.get('/revenue/:id',listProductDetail)
router.post('/revenue/:userId',requiredSignin, isAuth, isAdmin, createProduct)
router.delete('/revenue/:id',deleteProduct)
router.put('/revenue/:id',updateProduct)

router.param("userId",userById)

export default router;