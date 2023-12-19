import express from "express";
import { userById, userDetail, updateUser, editPasswordUser } from "../controllers/user";
const router = express.Router()

router.param("userId", userById)
router.get('/users/:id', userDetail);
router.put('/users/:id', updateUser)
router.patch('/users/editPass/:id', editPasswordUser);


export default router