import User from '../../models/User';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  currentUser?: User;
  loading: boolean;
  error?: string;
}

const initialAuthState: AuthState = {
  currentUser: undefined,
  loading: false,
  error: undefined
};


const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    logout: (state) => {
      state.currentUser = undefined;
      state.loading = false;
      state.error = undefined;
    },
    setUser: (state, { payload }) => {
      state.currentUser = payload;
      state.loading = false;
      state.error = undefined;
    }
  }

});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
