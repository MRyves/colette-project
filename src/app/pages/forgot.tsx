import React, { useState } from 'react';
import ForgotForm from '../components/auth/forgot-password';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase-config';


const ForgotPassword: React.FC = () => {

  const [message, setMessage] = useState<string>('');

  const handleResetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('E-Mail um das Passwort zurückzusetzen wurde gesendet. Bitte überprüfe deinen Posteingang.');
    } catch (error) {
      console.error('Firebase Fehler:', error);
      setMessage('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
    }
  };

  return (
    <ForgotForm handleResetPassword={handleResetPassword} message={message} />
  );
};

export default ForgotPassword;

