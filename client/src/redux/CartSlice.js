
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartitems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems"))
    :[],
    cartquantity:0
}
const CartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{

        addtocart:(state,action) => {

        const itemIndex = state.cartitems.findIndex(item => item._id === action.payload._id);
        
        if(itemIndex>=0)
        {
            state.cartitems[itemIndex].cartquantity +=1;
        }
        else{
            const tempproduct = {...action.payload,cartquantity:1}
            state.cartitems.push(tempproduct)
        }
        localStorage.setItem("cartItems",JSON.stringify(state.cartitems));
    },

    removecart:(state,action) => {

            const id = action.payload
            const nextcartitems = state.cartitems.filter(item => item._id !== id) 
            state.cartitems = nextcartitems;
            localStorage.setItem("cartItems",JSON.stringify(state.cartitems));
    }, 
    clearCart: (state) => {
        state.cartitems = [];
        localStorage.removeItem("cartItems");
      },

    decreament:(state,action) => {

         const itemIndex = state.cartitems.findIndex(item => item._id === action.payload._id);
    
         if(state.cartitems[itemIndex].cartquantity > 1)
         {
            state.cartitems[itemIndex].cartquantity -=1;
         }
         else if(state.cartitems[itemIndex].cartquantity === 1)
         {
            state.cartitems = state.cartitems.filter(item => item._id !== action.payload._id) 
         }
    },

        default:(state) => {
            return state
        }
}})

const CartReducer = CartSlice.reducer

export default CartReducer

export const {addtocart,removecart,decreament,clearCart} = CartSlice.actions;