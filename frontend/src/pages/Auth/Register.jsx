import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../components/Loader"
import { setCredientials } from "../../redux/features/auth/authSlice"
import { toast } from "react-toastify"
import { useRegisterMutation } from "../../redux/api/usersApiSlice"
import { Carousel } from 'flowbite-react';

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, {isLoading}] = useRegisterMutation();
    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(()=>{
        if (userInfo) {
            navigate(redirect)
        }
    },[navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("รหัสผ่านไม่ตรงกัน")
        } else {
            try {
                const res = await register({username,email, password}).unwrap()
                console.log(res);
                dispatch(setCredientials({...res}))
                navigate(redirect)
                toast.success("สมัครสมาชิกสำเร็จ")
            } catch (error) {
                toast.error(error.data.message)
            }
        }    
    }


    return <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
                <h1 className="text-2xl font-semibold mb-4">สมัครสมาชิก</h1>
            
            <form onSubmit={submitHandler} className="container w-[40rem]">
                <div className="my-[2rem]">
                    <label htmlFor="name" className="block text-sm font-medium">ชื่อผู้ใช้</label>
                    <div className  ="relative mb-6 mt-4">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                    </svg>
                            
                                </div>
                    
                    <input type="text" 
                        onChange={ e => setUsername(e.target.value)} 
                        id="name" placeholder="Enter name" 
                        value={username} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div> 
                </div>
                <div className="my-[2rem]">
                    <label htmlFor="email" className="block text-sm font-medium">อีเมลล์</label>
                    <div className  ="relative mb-6 mt-4">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                                    </svg>
                            
                                </div>
                    
                    <input type="email" 
                        onChange={ e => setEmail(e.target.value)} 
                        id="email" 
                        placeholder="Enter email" 
                        value={email} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div> 
                </div>
                <div className="my-[2rem]">
                    <label htmlFor="password" className="block text-sm font-medium">รหัสผ่าน</label>
                    <div className  ="relative mb-6 mt-4">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                    </svg>
                            
                                </div>
                    
                    <input type="password" 
                        onChange={ e => setPassword(e.target.value)} 
                        id="password" placeholder="*********" 
                        value={password} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div> 
                </div>
                <div className="my-[2rem]">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium">ยืนยันรหัสผ่าน</label>
                    <div className  ="relative mb-6 mt-4">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                
                                <svg className="w-4 h-4 text-gray-500 lg:w-4 lg:h-4 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
                                </svg>
                            
                                </div>
                    
                    <input type="password" 
                        onChange={ e => setConfirmPassword(e.target.value)} 
                        id="confirmPassword" placeholder="Confirm Password" 
                        value={confirmPassword} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div> 
                </div>

            <button disabled={isLoading} type="submit" className="bg-orange-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">{isLoading ? "กำลังสมัครสมาชิก ..." : "สมัครสมาชิก"}</button>

            {isLoading && <Loader/>}

            </form>

            <div className="mt-4">
                <p className="text-slate-600">
                    เป็นสมาชิกอยู่แล้ว ? {" "}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-orange-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
        

       



        <img src="..\public\Screenshot 2024-01-26 130855.png" alt="" className="h-[55rem] w-[59%] xl:block md:hidden sm:hidden rounded"/>
        

    </section>
  
}

export default Register