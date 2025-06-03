import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import pizzaReducer from "./slices/pizzaSlice";
import cartSlice from "./slices/cartSlice";
import authReducer from "./slices/authSlise";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    pizza: pizzaReducer,
    cart: cartSlice,
    auth: authReducer,
  },
});
