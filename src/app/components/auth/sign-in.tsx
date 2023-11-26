import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

interface SignInFormProps {
  control: any;
  errors: any;
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