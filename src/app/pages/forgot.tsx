import React from 'react';
import ForgotForm from '../components/auth/forgot-password';
import { useForm } from 'react-hook-form';


const ForgotPassword: React.FC = () => {
    // const { control, handleSubmit, formState: { errors } } = useForm();

  return (
    <ForgotForm />
    // <ForgotForm control={control} errors={errors} />
  );
};

export default ForgotPassword;

