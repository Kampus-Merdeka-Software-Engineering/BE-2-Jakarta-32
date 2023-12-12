import express from "express"
import { getUser, Register, Login, updatedSubscribe } from "../controllers/user_control.js"
import { getBerita, getBeritaFood, getBeritaLife, getBeritaMental, tambahBerita } from "../controllers/berita_control.js"

const router = express.Router()

router.get('/user', getUser)
router.post('/user/subscribe', updatedSubscribe)
router.post('/register', Register)
router.post('/login', Login)
router.get('/berita', getBerita)
router.get('/berita/mentalhealth', getBeritaMental)
router.get('/berita/lifestyle', getBeritaLife)
router.get('/berita/foodhealth', getBeritaFood)
router.post('/berita/tambahberita', tambahBerita)

export default router