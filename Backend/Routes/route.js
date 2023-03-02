import { Router } from "express";
import * as controller from '../controllers/User.js'
import * as blogCon from '../controllers/blog.js'
import auth from '../middleware/auth.js'
import upload from '../handlers/multer.js'
const router = Router()



router.route('/register').post(controller.register)
router.route('/login').post(controller.login)
router.route('/getData').get(auth,controller.getUserData)
router.route('/updateUser').put(auth,controller.updateUser)
router.route('/addBlog').post(auth,upload.array('file'),blogCon.addblog)
router.route('/Blog').get(auth,blogCon.fetchblog)
router.route('/getBlog/:id').get(blogCon.fetchSingleBlog)//user with useraname



export default router
