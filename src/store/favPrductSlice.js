import { createSlice } from "@reduxjs/toolkit";

const favProductSlice = createSlice({
    name: "favProduct",
    initialState: { favProducts: localStorage.getItem("favProduct") ? JSON.parse(localStorage.getItem("favProduct")) : [] },
    reducers: {
        addFavProducts(state, action) {
            //if already favProducts are added then alert product is added
            let existingProductIndex = state.favProducts.findIndex(item => item.id === action.payload.id);
            if (existingProductIndex >= 0) {
                alert("Product is already added");
            } else {
                state.favProducts.push({ ...action.payload });
                localStorage.setItem("favProduct", JSON.stringify(state.favProducts));
            }
        },
        removeFavProducts(state, action) {
            const filteredProducts = state.favProducts.filter(item => item.id != action.payload);
            state.favProducts = filteredProducts;
            localStorage.setItem("favProduct", JSON.stringify(state.favProducts));
        }
    }
})

export const { addFavProducts, removeFavProducts } = favProductSlice.actions;
export default favProductSlice.reducer;