import express from "express"
import { createProduct, deleteProduct, listProduct, listProductDetail, updateProduct } from "../controllers/notification";
import { userById } from "../controllers/user";
import { checkAuth, isAdmin, isAuth, requiredSignin } from "../middlewares/checkAuth";
const router = express.Router();


router.get('/notification',listProduct)
router.get('/notification/:id',listProductDetail)
router.post('/notification/:userId',requiredSignin, isAuth, isAdmin, createProduct)
router.delete('/notification/:id',deleteProduct)
router.put('/notification/:id',updateProduct)

router.param("userId",userById)

export default router;