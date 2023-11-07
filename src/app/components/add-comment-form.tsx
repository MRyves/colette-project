import React, { useState } from 'react'
import { Button, TextField, Typography } from '@mui/material'




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
            <Typography variant="h2">Comments</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nickname"
                    label="Your name"
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
                    label="Your comment"
                    name="comment"
                    autoComplete="comment"
                    value={comment}
                    onChange={handleChange}
                    autoFocus
                />
                <Button type="submit" variant="outlined">Comment</Button>
           </form>
        </div>
    )
}


export default AddCommentForm;