import React, { useState } from 'react';
import { Button, Rating, TextField, Typography } from '@mui/material';
import { db } from '../firebase-config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';


interface AddCommentFormProps {
  submitForm: (form: CommentForm) => void;
}

export interface CommentForm {
  nickname: string,
  comment: string,
  //rating: numner,
};

const initialState = {
  nickname: '',
  comment: ''
};


const AddCommentForm: React.FC<AddCommentFormProps> = ({ submitForm }) => {

  const [form, setForm] = useState(initialState);
  const { nickname, comment } = form;
  const [rating, setRating] = useState(0);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nickname && comment) {
      submitForm(form);
    }
  };


  const handleRatingChange = async (event: React.SyntheticEvent, newValue: number | null) => {
    // move logic to hook
    if (newValue !== null) {
      setRating(newValue);

      try {
        const docRef = await addDoc(collection(db, 'bewertungen'), {
          bewertung: newValue,
          zeitstempel: serverTimestamp()
        });
        console.log('Bewertung erfolgreich hinzugefügt mit ID: ', docRef.id);
      } catch (error) {
        console.error('Fehler beim Hinzufügen der Bewertung: ', error);
      }
    }
  };


  return (
    <div>
      <Typography variant='h2'>Kommentare</Typography>
      <form onSubmit={handleSubmit}>
        <Rating
          size='small'
          name='simple-controlled'
          value={rating}
          onChange={handleRatingChange}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='nickname'
          label='Dein Name'
          name='nickname'
          autoComplete='nickname'
          value={nickname}
          onChange={handleChange}
          autoFocus
        />
        <TextField
          margin='normal'
          required
          fullWidth
          multiline
          id='comment'
          label='Dein Kommentar'
          name='comment'
          autoComplete='comment'
          value={comment}
          onChange={handleChange}
          autoFocus
        />
        <Button type='submit' variant='outlined'>Kommentieren</Button>
      </form>
    </div>
  );
};


export default AddCommentForm;
