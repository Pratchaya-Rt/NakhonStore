import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import authReducer from './features/auth/authSlice'
import favoritesReducer from "./features/favorites/favoriteSlice";
import cartReducer from './features/cart/cartSlice.js'
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";
import shopReducer from "./features/shop/shopSlice.js";



const initialFavorites = getFavoritesFromLocalStorage() || []

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favorites: favoritesReducer,
        cart: cartReducer,
        shop: shopReducer
    },

    preloadedState: {
        favorites: initialFavorites,
      },
      
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,

});

setupListeners(store.dispatch)
export default  store