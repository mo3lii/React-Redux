import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
} from "../API/ProductApi";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllProductsAction = createAsyncThunk(
  "products/getAllProductsAction",
  async (_, thunkAPI) => {
    try {
      let response = await getAllProducts();
      console.log("response : ", response);
      return response.data;
    } catch (error) {}
  }
);

export const addProductAction = createAsyncThunk(
  "products/addProductAction",
  async (product, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let response = await addProduct(product);
      console.log("Add product response : ", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProductAction = createAsyncThunk(
  "products/deleteProductAction",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let response = await deleteProduct(id);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProductAction = createAsyncThunk(
  "products/updateProductAction",
  async ({ id, product }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let response = await editProduct(id, product);
      console.log("update response : ", response);
      return { id, product }; // Return an object with id and updated product
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: { products: [], error: null, isLoading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProductsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getAllProductsAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProductsAction.rejected, (state, action) => {
      state.products = action.payload;
    });
    /////////////////////////////////
    builder.addCase(addProductAction.fulfilled, (state, action) => {
      console.log("add payload : ", action.payload);
      state.isLoading = false;
      state.products.push(action.payload);
    });
    //////////////////////////////////
    builder.addCase(deleteProductAction.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.products = state.products.filter((p) => p.id !== action.payload.id);
    });
    builder.addCase(deleteProductAction.pending, (state, action) => {
      state.isLoading = true;
    });
    ////////////////////////////////////
    builder.addCase(updateProductAction.fulfilled, (state, action) => {
      console.log("update payload : ", action.payload);

      state.isLoading = false;
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? action.payload.product : product
      );
    });
  },
});

export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;
