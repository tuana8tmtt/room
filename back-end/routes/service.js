import express from "express"
import { createProduct, deleteProduct, listProduct, listProductDetail, updateProduct } from "../controllers/service";
import { userById } from "../controllers/user";
import { checkAuth, isAdmin, isAuth, requiredSignin } from "../middlewares/checkAuth";
const router = express.Router();


router.get('/service',listProduct)
router.get('/service/:id',listProductDetail)
router.post('/service/:userId',requiredSignin, isAuth, isAdmin, createProduct)
router.delete('/service/:id',deleteProduct)
router.put('/service/:id',updateProduct)

router.param("userId",userById)

export default router;