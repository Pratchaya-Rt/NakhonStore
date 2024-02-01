import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector} from 'react-redux'
import { useLoginMutation } from "../../redux/api/usersApiSlice" 
import { setCredientials } from "../../redux/features/auth/authSlice"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()

    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const res = await login({email, password}).unwrap()
            console.log(res);
            dispatch(setCredientials({...res}))
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }


    return <div>
        <section className="pl-[10rem] flex flex-wrap">
            <div className="mr-[4rem] mt-[5rem]">
                <h1 className="text-2xl font-semibold mb-4">ลงชื่อเข้าใช้</h1>

                <form onSubmit={submitHandler} className="container w-[40rem]">
                    <div className="my-[2rem]">
                        <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                        <div className  ="relative mb-6 mt-4">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                                </svg>
                            </div>
                            <input 
                                type="email" 
                                id="email" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                />
                        </div>
                        
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="password" className="block text-sm font-medium">Password</label>
                        <div className="relative mb-6 mt-4">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                            </svg>
                            </div>
                            <input 
                                type="password" 
                                id="password" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder=" *********"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                />
                        </div>
                    </div>

                    <button disabled={isLoading} type="submit" className="focus:outline-none text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-orange-900 my-[1rem]">{isLoading ? "เข้าสู่ระบบ..." : "เข้าสู่ระบบ"}</button>

                    {isLoading &&  <Loader/>}
                </form>

            <div className="mt-4">
                  <p className="">
                    ไม่ได้เป็นสมาชิก ? {" "}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-orange-500 hover:underline">สมัครสมาชิก</Link>
                  </p>
            </div>
            </div>

            <img src="https://images.unsplash.com/photo-1589810264340-0ce27bfbf751?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="h-[55rem] w-[59%] 2xl:block xl:hidden lg:hidden md:hidden sm:hidden  rounded"/>

        </section>
    </div>
  
}

export default Login