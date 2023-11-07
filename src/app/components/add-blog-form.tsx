import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import User from "../models/User";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Container } from '@mui/material';


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
};

const initialState = {
    title: "",
    lead: "",
    category: "",
    description: "",
    ingredients: "",
};

const categoryoption = [
    "Kochen",
    "Backen",
];

const AddBlogForm: React.FC<AddBlogFormProps>  = ({uploadProcess, setFile, submitForm}) => {

    const [form, setForm] = useState(initialState);
    const {title, category, lead, description, ingredients} = form;


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
        if (title && lead && description && ingredients && category) {
            submitForm(form);
        }
    };
    // const tags = [
    //     { title: 'Herbst' },
    //     { title: 'Weihnachten' },
    //     { title: 'Geburtstag' },
    //     { title: 'Halloween' },
    //     { title: 'Ostern' },
    //     { title: 'Apéro' },
    //     { title: 'Hauptgang' },
    //     { title: 'Dessert' },
    //     { title: 'Vegetarisch' },
    //     { title: 'Vegan' },
    //     { title: 'Festlich' },
    //     { title: 'Gebäck' },
    //   ];
    
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
                    label="Titel"
                    name="title"
                    autoComplete="title"
                    autoFocus
                    value={title}
                    onChange={handleChange}
                />
                <FormControl fullWidth>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                        fullWidth
                        labelId="category-label"
                        id="demo-select-small"
                        value={category}
                        label="Category"
                        onChange={onCategoryChange}
                        >
                        {categoryoption.map((option, index) => (
                            <MenuItem value={option} key={index}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* <Stack spacing={3} sx={{ width: 500 }}>
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={tags}
                        getOptionLabel={(option) => option.title}
                        defaultValue={[tags[13]]}
                        filterSelectedOptions
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label="filterSelectedOptions"
                            placeholder="Favorites"
                        />
                        )}
                    />
                </Stack> */}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="outlined-multiline-static"
                    label="Ingredients"
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
                    label="lead"
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
                    label="Description"
                    multiline
                    maxRows={4}
                    value={description}
                    name="description"
                    onChange={handleChange}
                />
                <Button component="label" variant="outlined" startIcon={<UploadFileIcon />}>
                    Upload image
                    <input type="file" accept=".jpg" hidden onChange={handleFileChange} />
                </Button>
                <Button type="submit" variant="outlined" disabled={uploadProcess !== null && uploadProcess < 100}>Create</Button>
            </form>
            </Container>
        </div>
    )
}



  
export default AddBlogForm
