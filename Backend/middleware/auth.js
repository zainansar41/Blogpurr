import jwt from 'jsonwebtoken'
import ENV from '../config.js'

export default async function auth(req,res,next){
    try {
        // access the authorized header
        const token = req.headers.authorization.split(" ")[1]
        
        const decodedToken = await jwt.verify(token,ENV.JSON_TOKEN)

        req.user= decodedToken

        next()
    } catch (error) {
        console.log(error);
        res.send({error:" authentication failed"})
    }
}
