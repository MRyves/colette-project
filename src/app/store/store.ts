import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer, { checkAuthStatus } from './auth/auth-slice';

const rootReducer = combineReducers({
  auth: authReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>, checkForAuthStatus = true) => {
  const appStore = configureStore({
    reducer: rootReducer,
    preloadedState
  });
  if (checkForAuthStatus) {
    appStore.dispatch(checkAuthStatus());
  }
  return appStore;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
