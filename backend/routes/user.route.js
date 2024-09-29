import express from 'express'
import { Login, Logout, Register } from '../controllers/user.controolers.js'
const router = express.Router()

router.route("/register").post(Register)
router.route("/login").post(Login)
router.route('/logout').get(Logout)

export default router