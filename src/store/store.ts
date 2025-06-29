import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./api/authApiSlice";
import { clientApiSlice } from "./api/clientApiSlice";
import { plansApiSlice } from "./api/plansApiSlice";
import { chatbotApiSlice } from "./api/chatbotApiSlice";

const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [clientApiSlice.reducerPath]: clientApiSlice.reducer,
    [plansApiSlice.reducerPath]: plansApiSlice.reducer,
    [chatbotApiSlice.reducerPath]: chatbotApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware,
      clientApiSlice.middleware,
      plansApiSlice.middleware,
      chatbotApiSlice.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
