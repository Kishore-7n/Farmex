import { createSlice} from "@reduxjs/toolkit";
import { fetchProducts } from "./ApiService";


const initialState = {
        products:[],
        status: "idle",
        error: null
}
const ProductSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
       addProduct:(state,action)=>{
            state.products.push(action.payload);
        },
     },
    extraReducers: (builder) => {
        builder
          .addCase(fetchProducts.pending, (state) => {
            state.status = "loading";
            
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.products = action.payload;
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })
          .addDefaultCase((state,action)=>{
            return state
          })
      }
})


const ProductReducer =  ProductSlice.reducer

export default ProductReducer

export const {addProduct} = ProductSlice.actions

export const Productlist = (state) => state.product.products

