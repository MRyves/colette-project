import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import User from '../models/User';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { FormControl, SelectChangeEvent, Container, Stack, FormControlLabel, Radio, RadioGroup, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Autocomplete, Grid } from '@mui/material';
import { AddButton } from '../theme/my-theme';

interface AddBlogFormProps {
  user?: User;
  uploadProcess: number;
  setFile: (file: File) => void;
  submitForm: (form: BlogForm) => void;
}

export interface BlogForm {
  title: string;
  category: string;
  lead: string;
  description: string;
  tags: string[];
  ingredients: string[];
  duration: string;
}

const initialState: BlogForm = {
  title: '',
  lead: '',
  category: '',
  description: '',
  tags: [],
  ingredients: [],
  duration: '',
};

const AddBlogForm: React.FC<AddBlogFormProps> = ({
  uploadProcess,
  setFile,
  submitForm,
}) => {
  const [form, setForm] = useState(initialState);
  const { title, category, lead, duration, description, ingredients } = form;

  const [listItemText, setListItemText] = useState<string>('');

  const handleAddListItem = () => {
    if (listItemText.trim() !== '') {
      setForm({ ...form, ingredients: [...form.ingredients, listItemText] });
      setListItemText('');
    }
  };

  const handleDeleteListItem = (index: number) => {
    const updatedList = [...form.ingredients];
    updatedList.splice(index, 1);
    setForm({ ...form, ingredients: updatedList });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleTagsChange = (event: any, newValue: { tagtitle: string }[]) => {
    setForm((prevForm) => ({
      ...prevForm,
      tags: newValue.map((tag) => tag.tagtitle),
    }));
  };

  const onCategoryChange = (e: SelectChangeEvent<string>) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && lead && description && duration && ingredients && category) {
      submitForm(form);
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="sm">
        <Typography variant="h1">Erfasse ein Rezept</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Rezepttitel"
            name="title"
            autoComplete="title"
            autoFocus
            value={title}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="outlined-multiline-flexible"
            label="Einleitung"
            multiline
            maxRows={4}
            value={lead}
            name="lead"
            onChange={handleChange}
          />
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={category}
              onChange={onCategoryChange}
            >
              <FormControlLabel
                value="Kochen"
                control={<Radio />}
                label="Kochen"
              />
              <FormControlLabel
                value="Backen"
                control={<Radio />}
                label="Backen"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            id="duration"
            label="Zeit"
            type='number'
            name="duration"
            autoComplete="duration"
            autoFocus
            value={duration}
            onChange={handleChange}
          />
          <Stack>
            <Autocomplete
              fullWidth
              multiple
              id="tags-standard"
              options={tags}
              getOptionLabel={(option) => option.tagtitle}
              onChange={handleTagsChange}
              renderInput={(params) => (
                <TextField {...params} variant="standard" label="Tags" />
              )}
            />
          </Stack>
          <List>
            {form.ingredients.map((item, index) => (
              <ListItem disablePadding divider key={index}>
                <ListItemText primary={item} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteListItem(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Grid container>
            <Grid item>
              <TextField
                fullWidth
                variant="outlined"
                label="Zutaten"
                value={listItemText}
                onChange={(e) => setListItemText(e.target.value)}
              />
            </Grid>
            <Grid item>
              <AddButton
                variant="outlined"
                color="secondary"
                endIcon={<AddIcon />}
                onClick={handleAddListItem}
              ></AddButton>
            </Grid>
          </Grid>
          <TextField
            margin="normal"
            required
            fullWidth
            id="outlined-multiline-flexible"
            label="Beschreibung"
            multiline
            maxRows={4}
            value={description}
            name="description"
            onChange={handleChange}
          />
          <Grid container spacing={2}>
                <Grid item>
                    <Button
                    component="label"
                    variant="outlined"
                    startIcon={<UploadFileIcon />}
                    >
                        Bild hochladen
                    <input
                        type="file"
                        accept=".jpg"
                        hidden
                        onChange={handleFileChange}
                    />
                    </Button>
                </Grid>
                <Grid item >
                <Button
                    type="submit"
                    variant="outlined"
                    disabled={uploadProcess !== null && uploadProcess < 100}
                >
                Erstellen
                </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

const tags = [
  { tagtitle: 'Gebäck' },
  { tagtitle: 'Frühling' },
  { tagtitle: 'Ostern' },
  { tagtitle: 'Weihnachten' },
  { tagtitle: 'Halloween' },
  { tagtitle: 'Herbst' },
  { tagtitle: 'Geburtstag' },
  { tagtitle: 'Vegetarisch' },
  { tagtitle: 'Vegan' },
  { tagtitle: 'Frühstück' },
  { tagtitle: 'Apéro' },
  { tagtitle: 'Dessert' },
];

export default AddBlogForm;
