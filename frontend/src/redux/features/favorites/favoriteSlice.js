import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      //เช็คว่า state ว่าสินค้าเป็น favorite หรือยัง ถ้ายังให้ push เพิ่มเข้าไป
      if (!state.some((product) => product._id === action.payload._id)) {
        state.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      // ใช้ฟังก์ชัน filter เพื่อสร้างอาร์เรย์ใหม่ที่ไม่รวมถึงสินค้าที่มี _id ตรงกับ _id ของสินค้าที่ต้องการลบ.
      return state.filter((product) => product._id !== action.payload._id);
    },
    setFavorites: (state, action) => {
      // กำหนด favorites จาก payload โดยทำการแทนที่ state ปัจจุบัน
      return action.payload;
    },
  },
});

export const { addToFavorites, removeFromFavorites, setFavorites } =
  favoriteSlice.actions;
export const selectFavoriteProduct = (state) => state.favorites;
export default favoriteSlice.reducer;