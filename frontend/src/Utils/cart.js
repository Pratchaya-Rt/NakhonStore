export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  
  export const updateCart = (state) => {
    // คำนวณราคาสินค้า
    state.itemsPrice = addDecimals(
      state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  
    // คำนวณราคาค่าขนส่ง
    state.shippingPrice = addDecimals(state.itemsPrice > 99 ? 0 : 35);

  
    // คำนวณราคารวม
    state.totalPrice = (
      Number(state.itemsPrice) +Number(state.shippingPrice)).toFixed(2);
  
    // บันทึกไปยัง localStorage
    localStorage.setItem("cart", JSON.stringify(state));
  
    return state;
  };