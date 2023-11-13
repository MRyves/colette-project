import { useState } from 'react';
import { AuthFormState } from '../components/auth/login-form';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function useAuth() {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signUp(email: string, password: string, firstName: string, lastName: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const displayName = `${firstName} ${lastName}`;
    await updateProfile(user, {
      displayName: displayName
    });
  }

  function validForm(authForm: AuthFormState) {
    return authForm.isSignUpMode ?
      !!authForm.firstName && !!authForm.lastName && !!authForm.email && !!authForm.password :
      !!authForm.email && !!authForm.password;
  }


  async function handleAuthForm(authForm: AuthFormState) {
    if (!validForm(authForm)) {
      setError('Invalid auth form!');
    }

    try {
      setLoading(true);
      if (authForm.isSignUpMode) {
        await signUp(authForm.email, authForm.password, authForm.firstName, authForm.lastName);
      } else {
        await login(authForm.email, authForm.password);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return {
    currentUser,
    handleAuthForm,
    loading,
    error,
  };
}
