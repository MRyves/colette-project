import React, { useMemo, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import User from '../models/User';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Autocomplete, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputLabel, ListItemSecondaryAction, ListItemText, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Stack, } from '@mui/material';
import { AddButton, AddList, AddListItem, MainContainer } from '../theme/my-theme';
import { Link } from 'react-router-dom';


export interface Ingredient {
  name: string;
  amount: string;
}

interface BlogFormProps {
  user?: User;
  uploadProcess: number;
  setFile: (file: File) => void;
  submitForm: (form: BlogFormState) => void;
  initialFormState?: BlogFormState;
}

export interface BlogFormState {
  title: string;
  lead: string;
  category: string;
  duration: string;
  quantity: string;
  tags: string[];
  level: string;
  ingredients: Ingredient[];
  description: string;
  additional: string;
  isEditMode: boolean;
}

const initialState: BlogFormState = {
  title: '',
  lead: '',
  category: '',
  duration: '',
  quantity: '',
  tags: [],
  level: '',
  ingredients: [],
  description: '',
  additional: '',
  isEditMode: false,
};

const BlogForm: React.FC<BlogFormProps> = ({ uploadProcess, setFile, submitForm, initialFormState = initialState, }) => {
  const [form, setForm] = useState(initialFormState);
  const { title, lead, category, duration, quantity, level, ingredients, description, additional, isEditMode, } = form;

  const [listItemText, setListItemText] = useState<string>('');
  const isSubmitDisabled = useMemo<boolean>(
    () => (isEditMode ? false : uploadProcess !== null && uploadProcess < 100),
    [isEditMode, uploadProcess]
  );


  const [ingredient, setIngredient] = useState<string>('');
  const [amount, setAmount] = useState<string>('');


  const handleAddIngredient = () => {
    if (ingredient.trim() !== '') {
      const newIngredient: Ingredient = { name: ingredient, amount: amount };
      setForm({ ...form, ingredients: [...form.ingredients, newIngredient] });
      setIngredient('');
      setAmount('');
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

  const handleTagsChange = (event: React.SyntheticEvent, newValue: { tagtitle: string }[]) => {
    setForm((prevForm) => ({
      ...prevForm,
      tags: newValue.map((tag) => tag.tagtitle),
    }));
  };

  const onCategoryChange = (e: SelectChangeEvent<string>) => {
    setForm({ ...form, category: e.target.value });
  };

  const onlevelChange = (e: SelectChangeEvent<string>) => {
    setForm({ ...form, level: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && lead && description && quantity && duration && additional && ingredients && category) {
      submitForm(form);
    }
  };

  return (
      <MainContainer maxWidth="md">
        {!isEditMode ? (
          <Typography variant="h1">Erfasse ein Rezept</Typography>
        ) : (
          <Typography variant="h1">Bearbeite dein Rezept</Typography>
        )}

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
          {/* <FormGroup>
            <FormControlLabel required control={<Checkbox />} label="Apéro" />
            <FormControlLabel required control={<Checkbox />} label="Vorspeise" />
            <FormControlLabel required control={<Checkbox />} label="Hauptgang" />
            <FormControlLabel required control={<Checkbox />} label="Dessert" />
            <FormControlLabel required control={<Checkbox />} label="Backen" />
            <FormControlLabel required control={<Checkbox />} label="Sonstiges" />
          </FormGroup>
 */}
          <FormControl sx={{m: '0px 0px 20px 0px'}}>
            <RadioGroup
            row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={category}
              onChange={onCategoryChange}
            >
              <FormControlLabel
                value="Apéro"
                control={<Radio required={true} />}
                label="Apéro"
                />
              <FormControlLabel
                value="Vorspeise"
                control={<Radio required={true} />}
                label="Vorspeise"
                />
              <FormControlLabel
                value="Hauptgang"
                control={<Radio required={true} />}
                label="Hauptgang"
              />
              <FormControlLabel
                value="Dessert"
                control={<Radio required={true} />}
                label="Dessert"
              />
              <FormControlLabel
                value="Backen"
                control={<Radio required={true} />}
                label="Backen"
              />
              <FormControlLabel
                value="Sonstiges"
                control={<Radio required={true} />}
                label="Sonstiges"
              />
            </RadioGroup>
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={6}>
            <TextField
            margin="normal"
            required
            fullWidth
            id="duration"
            label="Zubereitungszeit (Minuten)"
            type="number"
            name="duration"
            autoComplete="duration"
            autoFocus
            value={duration}
            onChange={handleChange}
          />
            </Grid>
            <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="outlined-multiline-flexible"
              label="Portionen / Stückanzahl"
              multiline
              maxRows={4}
              value={quantity}
              name="quantity"
              onChange={handleChange}
            />
            </Grid>
          </Grid>
          <Stack>
            <Autocomplete
              fullWidth
              multiple
              id="tags-standard"
              options={tags}
              getOptionLabel={(option) => option.tagtitle}
              isOptionEqualToValue={(option, value) =>
                option.tagtitle === value.tagtitle
              }
              onChange={handleTagsChange}
              value={form.tags.map((tag) => ({ tagtitle: tag }))}
              renderInput={(params) => (
                <TextField {...params} variant="standard" label="Tags" />
              )}
            />
          </Stack>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={level}
              onChange={onlevelChange}
            >
              <FormControlLabel
                value="Einfach"
                control={<Radio disableRipple required={true} />}
                label="Einfach"
              />
              <FormControlLabel
                value="Mittel"
                control={<Radio disableRipple required={true} />}
                label="Mittel"
              />
              <FormControlLabel
                value="Schwierig"
                control={<Radio disableRipple required={true} />}
                label="Schwierig"
              />
            </RadioGroup>
          </FormControl>
          <Grid container justifyContent={'space-between'} spacing={2}>
            <Grid item xs={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Menge"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
            </Grid>
            <Grid item xs={9}>
              <TextField
                fullWidth
                variant="outlined"
                label="Zutat"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                  />
            </Grid>
            <Grid item textAlign={'right'} xs={1}>
              <AddButton
              sx={{minWidth:0}}
                variant="outlined"
                endIcon={<AddCircleIcon style={{ fontSize: '35px' }} />}
                onClick={handleAddIngredient}
              ></AddButton>
            </Grid>
          </Grid>
          <AddList sx={{mb: '30px'}}>
            {form.ingredients.map((item, index) => (
              <AddListItem disablePadding key={index}>
                <ListItemText primary={
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <strong>{item.amount}</strong>
                    </Grid>
                    <Grid item xs={9}>
                      {item.name}
                    </Grid>
                  </Grid>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteListItem(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </AddListItem>
            ))}
          </AddList>
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
          <TextField
            margin="normal"
            fullWidth
            id="outlined-multiline-flexible"
            label="Tipps & Tricks"
            multiline
            maxRows={4}
            value={additional}
            name="additional"
            onChange={handleChange}
          />
          <Grid container justifyContent={'space-between'}>
            {!isEditMode ? (
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
            ) : (
              ''
            )}
            <Grid item>
              {!isEditMode ? (
                <Button
                  type="submit"
                  variant="outlined"
                  disabled={isSubmitDisabled}
                >
                  Erfassen
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="outlined"
                  disabled={isSubmitDisabled}
                >
                  Update
                </Button>
              )}
            </Grid>
            {isEditMode ? (
              <Grid item>
                <Link to={`/`}>
                  <Button variant="outlined" color="primary">
                    Abbrechen
                  </Button>
                </Link>
              </Grid>
            ) : (
              ''
            )}
          </Grid>
        </form>
      </MainContainer>
  );
};

const tags = [
  { tagtitle: 'Süss' },
  { tagtitle: 'Salzig' },
  { tagtitle: 'Frühling' },
  { tagtitle: 'Sommer' },
  { tagtitle: 'Herbst' },
  { tagtitle: 'Winter' },
  { tagtitle: 'Gebäck' },
  { tagtitle: 'Torten & Kuchen' },
  { tagtitle: 'Guezli' },
  { tagtitle: 'Vegetarisch' },
];

export default BlogForm;