import Typography from "@mui/material/Typography";
import SignUpForm from "./sign-up";
import SignInForm from "./sign-in";
import React, {ChangeEvent, FormEvent, useState} from "react";
import { Avatar, Box, Button, Container, CssBaseline } from "@mui/material";


  


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

export const LoginForm: React.FC<LoginProps> = ({handleSubmit}) => {

    const [formState, setFormState] = useState<AuthFormState>(initialState);
    const {isSignUpMode, email, password, firstName, lastName} = formState;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState({...formState, [e.target.name]: e.target.value});
    };

    const setSignUp = (value: boolean) => {
        setFormState({
            ...formState,
            isSignUpMode: value,
        });
    }

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isSignUpMode) {
            if (email && password) {
                handleSubmit(formState);
            }
        } else {
            if(email && password && firstName && lastName){
                handleSubmit(formState);
            }
        }
    }


    return <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <Typography variant="h1">{!isSignUpMode ? 'Sign-In' : 'Sign-Up'}</Typography>
            <form onSubmit={handleFormSubmit}>
                {isSignUpMode && (
                    <SignUpForm firstName={firstName} lastName={lastName} handleChange={handleChange}/>
                )}
                <SignInForm email={email} password={password} handleChange={handleChange}/>
                <Button className={`btn ${!isSignUpMode ? 'btn-sigh-in' : 'btn-sign-up'}`} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    {!isSignUpMode ? 'Sign-in' : 'Sign-up'}
                </Button>
            </form>
            <div>
                {!isSignUpMode ? (
                    <div>
                        <p>
                            Don't have an account?&nbsp;
                            <span style={{cursor: 'pointer'}} onClick={() => setSignUp(true)}>
                    <strong>Sign Up</strong>
                </span>
                        </p>
                    </div>
                ) : (
                    <div>
                        <p>
                            Already have an account?&nbsp;
                            <span style={{cursor: 'pointer'}} onClick={() => setSignUp(false)}>
                    <strong>Sign In</strong>
                </span>
                        </p>
                    </div>
                )}
            </div>
        </Box>
      </Container>
    </div>;
}
