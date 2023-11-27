import Typography from '@mui/material/Typography';
import SignUpForm from './sign-up';
import SignInForm from './sign-in';
import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline, Grid, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import { MainContainer } from 'src/app/theme/my-theme';

interface LoginProps {
  handleSubmit: (cred: AuthFormState) => void;
}

export interface AuthFormState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isSignUpMode: boolean;
}

const initialState: AuthFormState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isSignUpMode: false
};

export const LoginForm: React.FC<LoginProps> = ({ handleSubmit: submitForm }) => {
  const { control, handleSubmit: handleFormSubmit, formState: { errors }, setValue, watch } = useForm<AuthFormState, string>({
    defaultValues: initialState
  });

  const isSignUpMode = watch('isSignUpMode', false);
  const setSignUpMode = (value: boolean) => {
    setValue('isSignUpMode', value);
  };

  const setSignUp = (value: boolean) => {
    setValue('isSignUpMode', value);
  };

  const onSubmit = (formData: AuthFormState) => {
    submitForm(formData);
  };

  return (
    <div>
      <MainContainer maxWidth='sm'>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant='h1'>{!isSignUpMode ? 'Sign-In' : 'Sign-Up'}</Typography>
          <form onSubmit={handleFormSubmit(onSubmit)}>
            {isSignUpMode && (
              <SignUpForm control={control} errors={errors} />
            )}
            <SignInForm control={control} errors={errors} />
            <Button className={`btn ${!isSignUpMode ? 'btn-sigh-in' : 'btn-sign-up'}`} type='submit' fullWidth
                    variant='contained' sx={{ mt: 3, mb: 2 }}>
              {!isSignUpMode ? 'Sign-in' : 'Sign-up'}
            </Button>
          </form>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              {!isSignUpMode ? (
                <div>
                  Don't have an account?&nbsp;
                  <span style={{ cursor: 'pointer' }} onClick={() => setSignUp(true)}>
                                            <strong>Sign Up</strong>
                                        </span>
                </div>
              ) : (
                <div>
                  Already have an account?&nbsp;
                  <span style={{ cursor: 'pointer' }} onClick={() => setSignUp(false)}>
                                        <strong>Sign In</strong>
                                    </span>
                </div>
              )}
            </Grid>
          </Grid>
        </Box>
      </MainContainer>
    </div>
  );
};
