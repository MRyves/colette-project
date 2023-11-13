import React from 'react';
import { AuthFormState, LoginForm } from '../components/auth/login-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const SignIn: React.FC = () => {

  const navigate = useNavigate();
  const { currentUser, handleAuthForm, loading, error } = useAuth();


  const handleSubmit = (cred: AuthFormState) => {
    handleAuthForm(cred)
      .then((success) => {
        if(success){
          navigate('/');
        }
      });
  };

  return (
    <>
      <LoginForm handleSubmit={handleSubmit}></LoginForm>
      {`${loading}`}
    </>
  );
};

export default SignIn;

