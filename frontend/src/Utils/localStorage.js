// เพิ่มรายการโปรดสินค้าไว้ใน localStorage
export const addFavoriteToLocalStorage = (product) => {
    const favorites = getFavoritesFromLocalStorage();
    if (!favorites.some((p) => p._id === product._id)) {
      favorites.push(product);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };
  
  // ลบรายการโปรดสินค้าใน localStorage
  export const removeFavoriteFromLocalStorage = (productId) => {
    const favorites = getFavoritesFromLocalStorage();
    const updateFavorites = favorites.filter(
      (product) => product._id !== productId
    );
  
    localStorage.setItem("favorites", JSON.stringify(updateFavorites));
  };
  
  // ดึงข้อมูล favorites ใน localStorage
  export const getFavoritesFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem("favorites");
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
  };