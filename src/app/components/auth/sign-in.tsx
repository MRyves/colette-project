import { TextField } from '@mui/material';
import React from 'react';
import { Controller, FieldErrors } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';
import { AuthFormState } from './login-form';

interface SignInFormProps {
  control: Control<AuthFormState, string>;
  errors: FieldErrors<AuthFormState>;
}

const SignInForm: React.FC<SignInFormProps> = ({ control, errors }) => {
  return (
    <div>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <>
            <TextField
              {...field}
              required
              fullWidth
              autoFocus
              margin="normal"
              type="email"
              placeholder="E-Mail"
              autoComplete="email"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </>
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <>
            <TextField
              required
              fullWidth
              autoFocus
              margin="normal"
              {...field}
              type="password"
              placeholder="Passwort"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </>
        )}
      />
    </div>
  );
};

export default SignInForm;
