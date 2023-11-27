import React, { useMemo, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import User from '../models/User';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {
  Autocomplete,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Radio,
  RadioGroup,
  SelectChangeEvent,
  Stack
} from '@mui/material';
import { AddButton } from '../theme/my-theme';

interface BlogFormProps {
  user?: User;
  uploadProcess: number;
  setFile: (file: File) => void;
  submitForm: (form: BlogFormState) => void;
  initialFormState?: BlogFormState;
}

export interface BlogFormState {
  title: string;
  category: string;
  lead: string;
  description: string;
  tags: string[];
  ingredients: string[];
  duration: string;

  isEditMode: boolean;
}

const initialState: BlogFormState = {
  title: '',
  lead: '',
  category: '',
  description: '',
  tags: [],
  ingredients: [],
  duration: '',

  isEditMode: false
};

const BlogForm: React.FC<BlogFormProps> = ({
                                             uploadProcess,
                                             setFile,
                                             submitForm,
                                             initialFormState = initialState
                                           }) => {
  const [form, setForm] = useState(initialFormState);
  const { title, category, lead, duration, description, ingredients, isEditMode } = form;

  const [listItemText, setListItemText] = useState<string>('');
  const isSubmitDisabled = useMemo<boolean>(() => (isEditMode ? false : uploadProcess !== null && uploadProcess < 100), [isEditMode, uploadProcess]);

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
      [name]: value
    }));
  };

  const handleTagsChange = (event: any, newValue: { tagtitle: string }[]) => {
    setForm((prevForm) => ({
      ...prevForm,
      tags: newValue.map((tag) => tag.tagtitle)
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
      <Container component='main' maxWidth='sm'>
        <Typography variant='h1'>Erfasse ein Rezept</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='title'
            label='Rezepttitel'
            name='title'
            autoComplete='title'
            autoFocus
            value={title}
            onChange={handleChange}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='outlined-multiline-flexible'
            label='Einleitung'
            multiline
            maxRows={4}
            value={lead}
            name='lead'
            onChange={handleChange}
          />
          <FormControl>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
              value={category}
              onChange={onCategoryChange}
            >
              <FormControlLabel
                value='Kochen'
                control={<Radio />}
                label='Kochen'
              />
              <FormControlLabel
                value='Backen'
                control={<Radio />}
                label='Backen'
              />
            </RadioGroup>
          </FormControl>
          <TextField
            margin='normal'
            required
            fullWidth
            id='duration'
            label='Zeit'
            type='number'
            name='duration'
            autoComplete='duration'
            autoFocus
            value={duration}
            onChange={handleChange}
          />
          <Stack>
            <Autocomplete
              fullWidth
              multiple
              id='tags-standard'
              options={tags}
              getOptionLabel={(option) => option.tagtitle}
              isOptionEqualToValue={(option, value) => (option.tagtitle === value.tagtitle)}
              onChange={handleTagsChange}
              value={form.tags.map(tag => ({ tagtitle: tag }))}
              renderInput={(params) => (
                <TextField {...params} variant='standard' label='Tags' />
              )}
            />
          </Stack>
          <List>
            {form.ingredients.map((item, index) => (
              <ListItem disablePadding divider key={index}>
                <ListItemText primary={item} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge='end'
                    aria-label='delete'
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
                variant='outlined'
                label='Zutaten'
                value={listItemText}
                onChange={(e) => setListItemText(e.target.value)}
              />
            </Grid>
            <Grid item>
              <AddButton
                variant='outlined'
                color='secondary'
                endIcon={<AddIcon />}
                onClick={handleAddListItem}
              ></AddButton>
            </Grid>
          </Grid>
          <TextField
            margin='normal'
            required
            fullWidth
            id='outlined-multiline-flexible'
            label='Beschreibung'
            multiline
            maxRows={4}
            value={description}
            name='description'
            onChange={handleChange}
          />
          <Grid container spacing={2}>
            {!isEditMode ? <Grid item>
              <Button
                component='label'
                variant='outlined'
                startIcon={<UploadFileIcon />}
              >
                Bild hochladen
                <input
                  type='file'
                  accept='.jpg'
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
            </Grid> : ''}
            <Grid item>
              <Button
                type='submit'
                variant='outlined'
                disabled={isSubmitDisabled}
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
  { tagtitle: 'Dessert' }
];

export default BlogForm;
