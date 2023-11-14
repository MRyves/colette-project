import { createTheme, styled } from "@mui/material";




const myTheme = createTheme({
        typography: {
        fontFamily: 'Quattrocento, serif',
        body1: {
            fontSize: 18,
            lineHeight: 1.5,
            marginBottom: 10,
            fontWeight: 300,
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
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: 32,
            marginBottom: 20,
            lineHeight: 1.3,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 1.7
        },
        h2: {
            fontFamily: 'Josefin Sans, sans-serif',
            fontWeight: 600,
            fontSize: 30,
            marginBottom: 10,
            textTransform: "uppercase",
            letterSpacing: 1.7
        },
        h3: {
            fontFamily: 'Josefin Sans, sans-serif',
            fontWeight: 600,
            fontSize: 25,
            marginBottom: 10,
            textTransform: "uppercase",
            letterSpacing: 1.5
        },
        button: {
            fontFamily: 'Work Sans, sans-serif',
            fontSize: 16,
            letterSpacing: 1,
            borderRadius: 0,
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