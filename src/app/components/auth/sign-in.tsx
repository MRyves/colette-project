import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { AuthFormState } from './login-form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


interface SignInFormProps {
  control: Control<AuthFormState, string>;
  errors: FieldErrors<AuthFormState>;
}

const SignInForm: React.FC<SignInFormProps> = ({ control, errors }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


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
              label="E-Mail" 
              autoFocus
              margin="normal"
              type="email"
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
          <FormControl variant="outlined" fullWidth margin="normal" required>
            <InputLabel htmlFor="outlined-adornment-password">Passwort</InputLabel>
            <OutlinedInput
              {...field}
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
              label="Passwort"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </FormControl>
        )}
      />
    </div>
  );
};

export default SignInForm;
