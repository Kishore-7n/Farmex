import { configureStore,combineReducers } from '@reduxjs/toolkit'
import ProductReducer from './ProductSlice';
//import UserReducer from './UserSlice';
import CartReducer from './CartSlice';


const rootReducer = combineReducers({
  //user:UserReducer,
  product:ProductReducer,
  cart:CartReducer,
})

const store = configureStore({
  reducer:rootReducer,
  devTools:process.env.NODE_ENV !== 'production'
  
})


export default store;

