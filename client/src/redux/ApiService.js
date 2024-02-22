
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(

    "product/fetchProducts",
    async () => {
      const response = await fetch("http://localhost:8000/product",{
        method:'get',
      });
      const fetched_products = await response.json();
      return fetched_products;
    }
  );










