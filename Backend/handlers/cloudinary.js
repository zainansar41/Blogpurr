import cloudinary from 'cloudinary'
import ENV from '../config.js'

cloudinary.config({
    cloud_name:ENV.CLOUDINARY_CLOUD_NAME,
    api_key: ENV.CLOUDINARY_API_ID,
    api_secret:ENV.CLOUDINARY_API_SECRET
})

export default cloudinary