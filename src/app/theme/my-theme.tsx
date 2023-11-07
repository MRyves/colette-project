import { createTheme } from "@mui/material";


const myTheme = createTheme({
    typography: {
        fontFamily: 'Quattrocento, serif',
        body1: {
            fontSize: 19,
            marginBottom: 10,
            fontWeight: 400,
        },
        body2: {
            fontSize: 17,
            marginBottom: 10,
            color: '#000000',
        },
        caption: {
            fontSize: 17,
            marginBottom: 10,
            color: '#e1ac3b',
            fontWeight: 600,
        },
        h1: {
            fontFamily: 'Oswald, sans-serif',
            fontSize: 30,
            marginBottom: 20,
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: 2
        },
        h2: {
            fontFamily: 'Oswald, sans-serif',
            fontWeight: 400,
            fontSize: 30,
            marginBottom: 10,
            textTransform: "uppercase",
            letterSpacing: 1,
        },
        h3: {
            fontFamily: 'Oswald, sans-serif',
            fontWeight: 400,
            fontSize: 24,
            marginBottom: 10,
            textTransform: "uppercase",
            letterSpacing: 1
        },
        button: {
            fontFamily: 'Oswald, sans-serif',
            fontSize: 16,
            letterSpacing: 1,
        }
    },
    palette: {
        primary: {
            main: '#d3e5e7',
        },
        secondary: {
            main: '#000000',
        },
        background: {
            default: '#f5f5f5',
        },
    },
});


export default myTheme;