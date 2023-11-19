import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import User from "../models/User";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControl, SelectChangeEvent, Container, Autocomplete, Stack, FormControlLabel, Radio, RadioGroup, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@mui/material';



interface AddBlogFormProps {
    user?: User;
    uploadProcess: number;
    setFile: (file: File) => void;
    submitForm: (form: BlogForm) => void;
}


export interface BlogForm {
    title: string,
    category: string,
    lead: string,
    description: string,
    ingredients: string,
    duration: string,
};

const initialState = {
    title: "",
    lead: "",
    category: "",
    description: "",
    ingredients: "",
    duration: "",
};

const AddBlogForm: React.FC<AddBlogFormProps>  = ({uploadProcess, setFile, submitForm}) => {

    const [form, setForm] = useState(initialState);
    const {title, category, lead, duration, description, ingredients} = form;

    const [listItems, setListItems] = useState<string[]>([]);
    const [listItemText, setListItemText] = useState<string>('');
  
    const handleAddListItem = () => {
      if (listItemText.trim() !== '') {
        setListItems([...listItems, listItemText]);
        setListItemText('');
      }
    };
  
    const handleDeleteListItem = (index: number) => {
        const updatedList = [...listItems];
        updatedList.splice(index, 1);
        setListItems(updatedList);
      };

      
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
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
      <Container component="main" maxWidth="xs">
            <Typography variant="h1">Add a recipe</Typography>
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
                    id="duration"
                    label="Zeit"
                    name="duration"
                    autoComplete="duration"
                    autoFocus
                    value={duration}
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
                    <FormControlLabel value="Kochen" control={<Radio />} label="Kochen" />
                       <FormControlLabel value="Backen" control={<Radio />} label="Backen" />
                    </RadioGroup>
                </FormControl>
                <Stack>
                <Autocomplete
                    fullWidth
                    multiple
                    id="tags-standard"
                    options={tags}
                    getOptionLabel={(option) => option.title}
                    // onChange={handleTagsChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Tags"
                        />
                    )}
                />            
                </Stack>

                <List>
                    {listItems.map((item, index) => (
                        <ListItem key={index}>
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
                <TextField
                    label="Zutaten"
                    variant="outlined"
                    fullWidth
                    value={listItemText}
                    onChange={(e) => setListItemText(e.target.value)}
                />
                <Button variant="outlined" color="secondary" onClick={handleAddListItem}>
                    Hinzufügen
                </Button>



                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="outlined-multiline-static"
                    label="Zutaten"
                    multiline
                    maxRows={4}
                    value={ingredients}
                    name="ingredients"
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
                <Button component="label" variant="outlined" startIcon={<UploadFileIcon />}>
                    Bild hochladen
                    <input type="file" accept=".jpg" hidden onChange={handleFileChange} />
                </Button>
                <Button type="submit" variant="outlined" disabled={uploadProcess !== null && uploadProcess < 100}>Erstellen</Button>
            </form>
            </Container>
        </div>
    )
}

const tags = [
  { title: 'Gebäck' },
  { title: 'Frühling' },
  { title: 'Ostern' },
  { title: 'Weihnachten' },
  { title: 'Halloween' },
  { title: 'Herbst' },
  { title: 'Geburtstag' },
  { title: 'Vegetarisch' },
  { title: 'Vegan' },
  { title: 'Frühstück' },
  { title: 'Apéro' },
  { title: 'Dessert' },
];

  
export default AddBlogForm
