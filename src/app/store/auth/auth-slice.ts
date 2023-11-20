import User from '../../models/User';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthFormState } from '../../components/auth/login-form';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase-config';

interface AuthState {
  currentUser?: User;
  loading: boolean;
  error?: string;
}

const initialAuthState: AuthState = {
  currentUser: undefined,
  loading: false,
  error: undefined,
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout: (state) => {
      state.currentUser = undefined;
      state.loading = false;
      state.error = undefined;
    }
  },
  extraReducers: builder => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    }).addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = undefined;
    }).addCase(login.rejected, (state, action) => {
      state.currentUser = undefined
      state.loading = false;
      // @ts-ignore
      state.error = action.payload
    })
  }

});

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: AuthFormState, {rejectWithValue}) => {
    console.log({credentials});
    if (!credentials.isSignUpMode) {
      try {
        const {user} = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
        return {uid: user.uid, email: user.email, displayName: user.displayName} as User;
      } catch (e) {
        console.error('This account does not exist!');
        return rejectWithValue("This account does not exists!")
      }
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
        const user = userCredential.user;
        const displayName = `${credentials.firstName} ${credentials.lastName}`;
        await updateProfile(user, {
          displayName: displayName,
        });
        return {uid: user.uid, email: user.email, displayName: user.displayName} as User;
      } catch (error) {
        console.error('Error creating user:', error);
        return rejectWithValue("This account does not exists!")

      }
    }
  }
);

export const {logout} = authSlice.actions;

export default authSlice.reducer;
