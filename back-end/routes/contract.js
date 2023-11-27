import express from "express"
import { createContract, deleteContract, listContract, listContractDetail, updateContract } from "../controllers/contract";
import { userById } from "../controllers/user";
import { checkAuth, isAdmin, isAuth, requiredSignin } from "../middlewares/checkAuth";
const router = express.Router();


router.get('/contracts',listContract)
router.get('/contracts/:id',listContractDetail)
router.post('/contracts/:userId',requiredSignin, isAuth, isAdmin, createContract)
router.delete('/contracts/:id',deleteContract)
router.put('/contracts/:id',updateContract)

router.param("userId",userById)

export default router;