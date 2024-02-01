import { useState } from "react"
import { NavLink } from "react-router-dom"
import { FaTimes } from "react-icons/fa"


const AdminMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };




  return (
    <>
        <button className={`${isMenuOpen ? "top-2 right-2" : "top-5 right-7"} bg-[#2D3250] p-2 fixed rounded-lg`} onClick={toggleMenu}>
        
        {isMenuOpen ? (<FaTimes color="white" />
        ) : (
          <>
            <div className="w-6 h-0.5 bg-gray-100 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-100 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-100 my-1"></div>
          </>
        )}
        </button>

        {isMenuOpen && (    
            <section className="bg-[#2D3250] p-4 fixed right-7 top-5">
                 <ul className="list-none mt-2">
                    <li>
                    <NavLink
                        className="list-item py-2 px-3 mb-5 hover:bg-[#424769] rounded-sm"
                        to="/admin/dashboard"
                        style={({ isActive }) => ({
                        color: isActive ? "#F6B17A" : "white",
                        })}
                    >
                        Admin Dashboard
                    </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="list-item py-2 px-3 mb-5 hover:bg-[#424769] rounded-sm"
                            to="/admin/categorylist"
                            style={({ isActive }) => ({
                            color: isActive ? "#F6B17A" : "white",
                            })}>
                            สร้างหมวดหมู่สินค้า
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="list-item py-2 px-3 mb-5 hover:bg-[#424769] rounded-sm"
                            to="/admin/productlist"
                            style={({ isActive }) => ({
                            color: isActive ? "#F6B17A" : "white",
                            })}
                        >
                            เพิ่มสินค้า
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="list-item py-2 px-3 mb-5 hover:bg-[#424769] rounded-sm"
                            to="/admin/allproductslist"
                            style={({ isActive }) => ({
                            color: isActive ? "#F6B17A" : "white",
                            })}
                        >
                            สินค้าทั้งหมด
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="list-item py-2 px-3 mb-5 hover:bg-[#424769] rounded-sm"
                            to="/admin/userlist"
                            style={({ isActive }) => ({
                            color: isActive ? "#F6B17A" : "white",
                            })}
                        >
                            จัดการผู้ใช้
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="list-item py-2 px-3 mb-5 hover:bg-[#424769] rounded-sm"
                            to="/admin/orderlist"
                            style={({ isActive }) => ({
                            color: isActive ? "#F6B17A" : "white",
                            })}
                        >
                           จัดการคำสั่งซื้อ
                        </NavLink>
                    </li>
                </ul>



            </section>

        
        )}


    </>
  )
}

export default AdminMenu