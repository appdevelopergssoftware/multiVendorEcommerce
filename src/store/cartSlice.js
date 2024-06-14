import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {cartItems: localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : []},
    reducers: {
        addToCart(state, action) {
            //if any product already added to cart item then alert show
            let existingProductIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            if(existingProductIndex >= 0){
                alert("This product is already added to the cart");
            } else{
                state.cartItems.push({...action.payload});
                localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
            }
        },
        removeCartItem(state, action){
            const filteredProducts = state.cartItems.filter(item => item.id != action.payload);
            state.cartItems = filteredProducts;
            localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
        },
        quantityDecrease(state, action){
            const item = state.cartItems.find(item => item.id === action.payload);
            if (item.quantity > 1){
                item.quantity --;
            } else{
                item.quantity = 1;
            }
            localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
        },
        quantityIcrease (state, action){
            const item = state.cartItems.find(item => item.id === action.payload);
            if(item.quantity < 5){
                item.quantity ++;
            }
            localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
        }
    }
})

export const {addToCart, removeCartItem, quantityDecrease, quantityIcrease} = cartSlice.actions;
export default cartSlice.reducer;