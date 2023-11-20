import User from '../../models/User';
import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { AuthFormState } from '../../components/auth/login-form';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase-config';

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
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    logout: (state) => {
      state.currentUser = undefined;
      state.loading = false;
      state.error = undefined;
    }
  },
  extraReducers: builder => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    }).addCase(login.fulfilled, (state) => {
      state.loading = false;
      state.error = undefined;
    }).addCase(login.rejected, (state, action: PayloadAction<any>) => {
      state.currentUser = undefined;
      state.loading = false;
      state.error = action.payload as string;
    });
  }

});

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: AuthFormState, { rejectWithValue }) => {
    if (!credentials.isSignUpMode) {
      try {
        await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      } catch (e) {
        console.error('This account does not exist!');
        return rejectWithValue('This account does not exists!');
      }
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
          .then((userCredentials) => {
            signOut(auth);
            return userCredentials;
          });
        const {user} = userCredential;
        const displayName = `${credentials.firstName} ${credentials.lastName}`;
        await updateProfile(user, {
          displayName: displayName
        });
        await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      } catch (error) {
        console.error('Error creating user:', error);
        return rejectWithValue('This account does not exists!');

      }
    }
  }
);

export const checkAuthStatus = () => (dispatch: Dispatch) => {
  return auth.onAuthStateChanged(user => {
    if (user) {
      dispatch(authSlice.actions.setUser({
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || 'Kein Anzeigename!'
      }));
    } else {
      dispatch(authSlice.actions.logout());
    }
  });
};

export const { logout } = authSlice.actions;

export default authSlice.reducer;
