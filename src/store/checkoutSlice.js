import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {checkoutItems: localStorage.getItem("checkout-Item") ? JSON.parse(localStorage.getItem("checkout-Item")) : []},
    reducers: {
        addCheckout(state, action){
            state.checkoutItems = action.payload;
            localStorage.setItem("checkout-Item", JSON.stringify(state.checkoutItems));
        }
    }
})

export const { addCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;