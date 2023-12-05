import { TextField } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { AuthFormState } from './login-form';

interface SignUpFormProps {
  control: Control<AuthFormState, string>;
  errors: FieldErrors<AuthFormState>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ control, errors }) => {
  return (
    <div>
      <Controller
        name="firstName"
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
              type="text"
              placeholder="Vorname"
            />
            {errors.firstName && <p>{errors.firstName.message}</p>}
          </>
        )}
      />
      <Controller
        name="lastName"
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
              type="text"
              placeholder="Nachname"
            />
            {errors.lastName && <p>{errors.lastName.message}</p>}
          </>
        )}
      />
    </div>
  );
};

export default SignUpForm;
