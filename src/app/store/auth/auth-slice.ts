import User from '../../models/User';
import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { AuthFormState } from '../../components/auth/login-form';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
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
    }).addCase(login.fulfilled, (state, action) => {
      if (action.payload.displayName && state.currentUser) {
        state.currentUser.displayName = action.payload.displayName;
      }
      state.loading = false;
      state.error = undefined;
    }).addCase(login.rejected, (state, action) => {
      state.currentUser = undefined;
      state.loading = false;
      state.error = action.payload;
    });
  }

});

export const login = createAsyncThunk<
  { displayName?: string },
  AuthFormState, {
  rejectValue: string
}
>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    if (!credentials.isSignUpMode) {
      try {
        await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
        return {};
      } catch (e) {
        console.error('Dieses Konto existiert nicht!');
        return rejectWithValue('Dieses Konto existiert nicht!');
      }
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
        const { user } = userCredential;
        const displayName = `${credentials.firstName} ${credentials.lastName}`;
        await updateProfile(user, {
          displayName: displayName
        });

        await sendEmailVerification(user);

        return { displayName };
      } catch (error) {
        console.error('Fehler beim Erstellen des Benutzers:', error);
        return rejectWithValue('Fehler beim Erstellen des Benutzers!');
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
