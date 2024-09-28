import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import auth from "./auth";

const store: EnhancedStore = configureStore({
  reducer: {
    auth,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
