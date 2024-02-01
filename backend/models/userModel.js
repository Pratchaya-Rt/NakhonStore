import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }

},{timestamps: true})   // บอกเวลาเมื่อได้ทำการ สร้าง อัพเดท ลบ อื่นๆ user 

const User = mongoose.model('User', userSchema)

export default User;