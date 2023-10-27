import { Router } from "express"
import { createUser, editUserById, getAllUsers, getUserById, login } from "../controllers/users.controller";

const router = Router();

router.get('/users', getAllUsers)
router.post('/users', createUser)
router.post('/login', login)
router.get('/users/:id', getUserById )
router.put('/users/:id', editUserById)

export default router;