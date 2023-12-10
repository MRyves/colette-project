import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer, { checkAuthStatus } from './auth/auth-slice';
import darkModeReducer from './darkModeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  darkMode: darkModeReducer,
});

export const appStore = configureStore({
  reducer: rootReducer,
});

appStore.dispatch(checkAuthStatus());

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
