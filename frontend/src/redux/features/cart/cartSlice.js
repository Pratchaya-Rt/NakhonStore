import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../Utils/cart";

const initialState = localStorage.getItem("cart")
  //ดึงข้อมูลจาก localStorage
  ? JSON.parse(localStorage.getItem("cart"))
  //ไม่มีก็จะเรียกใช้ object ที่กำหนดเอง 
  : { cartItems: [], shippingAddress: {}, paymentMethod: "TrueMoney Wallet" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //เพิ่มลงตะกร้า
    addToCart: (state, action) => {
      const { user, rating, numReviews, reviews, ...item } = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      
      //เพิ่มเข้าไปใน cartItems
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      //เรียก updateCart เพื่ออัปเดต localStorage และคืน state ใหม่.
      return updateCart(state, item);
    },

    //ลบสินค้าออกจากตะกร้า
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },

    //ที่อยู่จัดส่ง แล้ว save state ใหม่ลงใน localStorage.
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    //วิธีการชำระเงิน แล้ว save state ใหม่ลงใน localStorage.
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    //ล้างข้อมูลทั้งหมดในตะกร้า
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },

    //รีเซ็ต state ของตะกร้าให้เป็น initialState.
    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;