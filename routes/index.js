import express from "express"
import { getUser, Register, Login } from "../controllers/user_control.js"

const router = express.Router()

router.get('/user', getUser)
router.post('/register', Register)
router.post('/login', Login)

export default router