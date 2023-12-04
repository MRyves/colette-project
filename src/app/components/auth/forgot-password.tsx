import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { Button, TextField, Typography } from '@mui/material';
import { MainContainer } from '../../theme/my-theme';
import { Controller } from 'react-hook-form';




// interface ForgotProps {
//     control: any;
//     errors: any;
//   }
  
//   const ForgotForm: React.FC<ForgotProps> = ({ control, errors }) => {
  const ForgotForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('E-Mail um das Passwort zurückzusetzen wurde gesendet. Bitte überprüfe deinen Posteingang.');
            setEmail('');
        } catch (error) {
            console.error('Firebase Fehler:', error);
            setMessage('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
        }
    };
    

    return (
        <MainContainer maxWidth="md">
            <Typography variant='h1'>Passwort vergessen</Typography>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Gib deine E-Mail-Adresse ein"
                    value={email}
                    onChange={handleEmailChange}
                />
                {/* <Controller
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
                /> */}
                <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
                    Passwort zurücksetzen
                </Button>
            </form>
            <p>{message}</p>
        </MainContainer>
    );
};

export default ForgotForm;
