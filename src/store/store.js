import { configureStore } from "@reduxjs/toolkit";
import favPrductSlice from "./favPrductSlice";
import cartSlice from "./cartSlice";
import checkoutSlice from "./checkoutSlice";

const store = configureStore({
    reducer: {
        favProduct: favPrductSlice,
        cartItem: cartSlice,
        checkoutItem: checkoutSlice
    }
})

export default store;