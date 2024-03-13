
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(

    "product/fetchProducts",
    async () => {
      const response = await fetch("https://farmex.onrender.com/product",{
        method:'get',
      });
      const fetched_products = await response.json();
      return fetched_products;
    }
  );










