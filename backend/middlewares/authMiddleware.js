import jwt, { decode } from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'

const authenticate = asyncHandler(async(req, res, next)=>{
    let token;

    // อ่าน JWT จาก 'jwt' cookie
    token = req.cookies.jwt

    if (token) {
        try {
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select("-password")
            next();
        } catch (error) {
            res.status(401)
            throw new Error('ไม่ได้รับอนุญาต, token failed')
        }
    } else {
        res.status(401)
        throw new Error('ไม่ได้รับอนุญาต, no token.')
    }
})

// Check for the admin 
const authorizeAdmin = (req, res, next) =>  {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).send("ไม่ได้รับอนุญาตให้เป็นผู้ดูแลระบบ")
    }
}

export {authenticate, authorizeAdmin}