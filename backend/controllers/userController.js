import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from 'bcryptjs'
import createToken from '../utils/createToken.js'

const createUser = asyncHandler(async(req,res) => {
    const {username, email, password} = req.body
    //console.log(req.body)

    //เติม ข้อมูลให้ครบ  
    if (!username || !email || !password) {
        throw new Error("กรุณาป้อนข้อมูลให้ครบ")
    }

    //เช็ค user ซ้ำ
    const userExists = await User.findOne({email})
    if (userExists) res.status(400).send("มีผู้ใช้งานนี้แล้ว")

    //ใช้ bcrypt ป้องกันการเข้าถึง password
    const salt = await bcrypt.genSalt(10)   //ความยากในการเข้าถึง
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({username, email, password: hashedPassword})


    //response ข้อมูล newUser และบันทึก newUser ใน DB
    try {
        await newUser.save()
        createToken(res, newUser._id)   
        res
            .status(201)
            .json({
                _id:newUser._id,
                username: newUser.username,
                email: newUser.email,
                isAdmin: newUser.isAdmin
            })

    } catch (error) {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

//!-------------------------------------
//! LOGIN 

const loginUser = asyncHandler(async(req, res) =>{
    const {email, password} = req.body

    //ค้นหาการมีอยู่ของ email ว่าตรงกับที่กำหนดไหม
    const existingUser = await User.findOne({email})

    //ตรวจสอบรหัสผ่าน
    //หากมีผู้ใช้ที่มี email ตรงกับที่กำหนด, ต่อไปนี้โค้ดจะใช้ `bcrypt.compare` เพื่อเปรียบเทียบรหัสผ่านที่ผู้ใช้ป้อนกับรหัสผ่านที่ถูกเก็บไว้ในฐานข้อมูล.
    if(existingUser){
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)
        
        
        //สร้าง Token และส่งข้อมูลผู้ใช้กลับ:
        if (isPasswordValid) {
            createToken(res, existingUser._id)
            res
            .status(201)
            .json({
                _id:existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin
            })
            return;   //ออกจาก function หลังจากได้ทำการส่ง response แล้ว
        }
    }
})

//!-------------------------------------


//! LOGOUT
// ล็อคเอ้าท์โดยไม่มี cookie (jwt)
const logoutCurrentUser = asyncHandler(async(req,res) =>{
    res.cookie("jwt", '', {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({message: "ล็อคเอ้าท์สำเร็จ"})
})

//!-------------------------------------


//! Get All Users
const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find({})
    res.json(users)
})

//!-------------------------------------

//! Get Profile
const getCurrentUserProfile = asyncHandler(async(req,res) =>{
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id:user._id,
            username: user.username,
            email: user.email
        })
    } else {
        res.status(404)
        throw new Error("ไม่พบผู้ใช้งาน")
    }

})

//!-------------------------------------

//! Update Profile

const updateCurrentUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)

            //const newUser = new User({username, email, password: hashedPassword})

            user.password = hashedPassword;
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error("ไม่พบผู้ใช้งาน")
    }
})

//!-------------------------------------


//! Admin side 
//! Delete user by id
const deleteUserById = asyncHandler(async(req,res) =>{
    const user = await User.findById(req.params.id)

    if (user) {
        if(user.isAdmin){
            res.status(400)
            throw new Error('ไม่สามารถลบผู้ดูแลระบบ (admin) ได้')
        }

        await User.deleteOne({_id: user._id})
        res.json({message: "ผู้ใช้งานถูกลบแล้ว"})

    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

//!-------------------------------------

//! get ข้อมูล user จาก id (โดย admin)
const getUserById = asyncHandler(async(req, res)=> {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error("ไม่พบผู้ใช้งานนี้")
    }
})
//!-------------------------------------

//! Update user by id (Admin)

const updateUserById = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.params.id)

    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.isAdmin = Boolean(req.body.isAdmin)

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error("ไม่พบผู้ใช้งาน")
    }
})





export { createUser, loginUser, logoutCurrentUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile, deleteUserById, getUserById, updateUserById}