import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Profile from '../../pages/profile';
import { Button, Avatar } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { User } from 'firebase/auth';


interface SignUpFormProps {
  firstName: string;
  lastName: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // user: User | null;
  // setFile: (file: File) => void;
}


const SignUpForm: React.FC<SignUpFormProps> = ({ firstName, lastName, handleChange }) => {

  // const [file, setFile] = useState<File | null>(null);
  // const userId = user?.uid || '';
  // const [photoURL, setPhotoURL] = useState('');


  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (e.target.files && e.target.files[0]) {
  //         setFile(e.target.files[0]);
  //     }
  // };

  return (
    <div>
      {/* <Button component="label" variant="outlined" startIcon={<UploadFileIcon />}>
          Upload image
          <input type="file" accept=".jpg" hidden onChange={handleFileChange} />
      </Button>
      <Avatar alt="Remy Sharp" src={photoURL} /> */}
      <TextField
        margin="normal"
        required
        fullWidth
        id="firstName"
        label="Vorname"
        name="firstName"
        autoComplete="firstName"
        autoFocus
        value={firstName}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="lastName"
        label="Nachname"
        type="lastName"
        id="lastName"
        autoComplete="current-password"
        value={lastName}
        onChange={handleChange}
      />
    </div>
  );
};

export default SignUpForm;