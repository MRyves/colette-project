import Typography from "@mui/material/Typography";
import SignUpForm from "./sign-up";
import SignInForm from "./sign-in";
import React, { useState } from "react";
import { Button, Grid, Link } from "@mui/material";
import { useForm } from 'react-hook-form';
import { MainContainer } from "../../theme/my-theme";

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
    isSignUpMode: false,
};

export const LoginForm: React.FC<LoginProps> = ({ handleSubmit: submitForm }) => {
    const { control, handleSubmit: handleFormSubmit, formState: { errors }, setValue, watch } = useForm<AuthFormState, string>({
        defaultValues: initialState,
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
        <MainContainer maxWidth="md">
            <Typography variant="h1">{!isSignUpMode ? 'Anmelden' : 'Registrieren'}</Typography>
            <form onSubmit={handleFormSubmit(onSubmit)}>
                {isSignUpMode && (
                    <SignUpForm control={control} errors={errors} />
                )}
                <SignInForm control={control} errors={errors} />
                <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
                    {!isSignUpMode ? 'Anmelden' : 'Registrieren'}
                </Button>
            </form>
            <Grid container>
                <Grid item xs>
                    <Link href="/forgot" variant="body2">
                        <Typography variant="body1">Passwort vergessen?</Typography>
                    </Link>
                </Grid>
                <Grid item>
                    {!isSignUpMode ? (
                        <div>
                            Bist du neu hier?&nbsp;
                            <span style={{ cursor: 'pointer' }} onClick={() => setSignUp(true)}>
                                <strong>Registrieren</strong>
                            </span>
                        </div>
                    ) : (
                    <div>
                        Hast du schon einen Account?&nbsp;
                        <span style={{ cursor: 'pointer' }} onClick={() => setSignUp(false)}>
                            <strong>Login</strong>
                        </span>
                    </div>
                    )}
                </Grid>
            </Grid>
        </MainContainer>
    );
}