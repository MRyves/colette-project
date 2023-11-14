import React, { useState } from 'react'
import { Button, Rating, TextField, Typography } from '@mui/material'




interface AddCommentFormProps {
    submitForm: (form: CommentForm) => void;
}

export interface CommentForm {
    nickname: string,
    comment: string,
};

const initialState = {
    nickname: "",
    comment: "",
};



const AddCommentForm: React.FC<AddCommentFormProps>  = ({submitForm}) => {

    const [form, setForm] = useState(initialState);
    const {nickname, comment} = form;
    const [value, setValue] = React.useState<number | null>(null);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (nickname && comment) {
            submitForm(form);
        }
    };



    return (
        <div>
            <Typography variant="h2">Kommentare</Typography>
            <form onSubmit={handleSubmit}>
                <Rating
                  size='small'
                  name='simple-controlled'
                  value={value}
                  // onChange={handleChange}
                  />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nickname"
                    label="Dein Name"
                    name="nickname"
                    autoComplete="nickname"
                    value={nickname}
                    onChange={handleChange}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    id="comment"
                    label="Dein Kommentar"
                    name="comment"
                    autoComplete="comment"
                    value={comment}
                    onChange={handleChange}
                    autoFocus
                />
                <Button type="submit" variant="outlined">Kommentieren</Button>
           </form>
        </div>
    )
}


export default AddCommentForm;