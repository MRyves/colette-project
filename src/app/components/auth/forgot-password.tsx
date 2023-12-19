import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { Button, TextField, Typography } from '@mui/material';
import { MainContainer } from '../../theme/my-theme';
import { Controller, useForm } from 'react-hook-form';


interface ForgotFormProps {
  handleResetPassword: (email: string) => {},
  message: string,
}

interface ForgotFormState {
  email: string
}

const ForgotForm: React.FC<ForgotFormProps> = ({handleResetPassword, message}) => {

  const { control, handleSubmit, formState: { errors } } = useForm<ForgotFormState>({
    defaultValues: {email: ''},
  });


  return (
    <MainContainer maxWidth='md'>
      <Typography variant='h1'>Passwort vergessen</Typography>
      <form onSubmit={handleSubmit(({email}) => handleResetPassword(email))}>
        <Controller
          name='email'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <>
              <TextField
                {...field}
                required
                fullWidth
                autoFocus
                margin='normal'
                type='email'
                label='E-Mail'
                autoComplete='email'
              />
              {errors.email && <p>{errors.email.message}</p>}
            </>
          )}
        />
        <Button type='submit' fullWidth variant='outlined' sx={{ mt: 3, mb: 2 }}>
          Passwort zurücksetzen
        </Button>
      </form>
      <p>{message}</p>
    </MainContainer>
  );
};

export default ForgotForm;
