import {configureStore} from "@reduxjs/toolkit";
import authReducer, { checkAuthStatus } from './auth/auth-slice';

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
  }
});

appStore.dispatch(checkAuthStatus());

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
