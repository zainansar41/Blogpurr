import { Router } from "express";
import * as controller from '../controllers/User.js'
import auth from '../middleware/auth.js'


const router = Router()



router.route('/register').post(controller.register)
router.route('/login').post(controller.login)
router.route('/getData').get(auth,controller.getUserData)
router.route('/updateUser').put(auth,controller.updateUser)


export default router
