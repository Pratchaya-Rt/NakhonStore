import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {toast} from 'react-toastify'
import Loader from "../../components/Loader"
import { setCredientials } from "../../redux/features/auth/authSlice"
import { Link } from "react-router-dom"
import { useProfileMutation } from "../../redux/api/usersApiSlice"
import { set } from "mongoose"


const Profile = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const {userInfo} = useSelector( state => state.auth)
    const dispatch = useDispatch()

    const [updateProfile, {isLoading: loadingUpdateProfile}] =useProfileMutation()

    useEffect(() =>{
        setUsername(userInfo.username)
        setEmail(userInfo.email)
    },[userInfo.email, userInfo.username])
  
    const submitHandler = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            try {
                const res = await updateProfile({_id: userInfo._id, username, email, password}).unwrap()
                dispatch(setCredientials({...res}))
                toast.success('อัพเดทโปรไฟล์สำเร็จ')

            } catch (error) {
                toast.error(error?.data?.message || error.message)
            }
        }
    }
  
  
  
    return (
    <div className="container mx-auto p-4 mt-[4rem]">
        <div className="flex justify-center align-center md:flex md:space-x-4">
            <div className="md:w-1/3">
                <h2 className="text-2xl font-semibold mb-8">อัพเดทโปรไฟล์</h2>
                <form action="" onSubmit={submitHandler}>
                    <div className="mb-4 mt-10">
                        <label htmlFor="" className="block">ชื่อผู้ใช้</label>
                        <input 
                        type="text" 
                        placeholder="Enter name" 
                        className="form-input p-3 mt-4 rounded w-full border border-zinc-200" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 mt-10">
                        <label htmlFor="" className="block">อีเมลล์</label>
                        <input 
                        type="email" 
                        placeholder="Enter email" 
                        className="form-input p-3 mt-3 rounded w-full border border-zinc-200" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 mt-10">
                        <label htmlFor="" className="block">รหัสผ่าน</label>
                        <input 
                        type="password" 
                        placeholder="Enter password" 
                        className="form-input p-3 mt-3 rounded w-full border border-zinc-200" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 mt-10">
                        <label htmlFor="" className="block">ยืนยันรหัสผ่าน</label>
                        <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        className="form-input p-3 mt-3 rounded w-full border border-zinc-200" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-between mt-16">
                        <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400">อัพเดท</button>
                        <Link to='/user-orders' className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-500">คำสั่งซื้อ</Link>
                             
                    </div>
                </form>
            </div>

            {loadingUpdateProfile && <Loader/>}
        </div>
    </div>
  )
}

export default Profile