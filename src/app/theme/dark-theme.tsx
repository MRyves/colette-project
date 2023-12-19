import { Button, Card, List, ListItem, createTheme } from "@mui/material";
import { myTheme } from "./my-theme";
import styled from "@emotion/styled";



const Colors = {
    black: '#000000',
    lightgrey: '#dddddd',
    borderColors: '#2a2a2a',
    white: '#ffffff',
    darkgrey: '#dddddd',
    primary: {
        light: '#aea5ad',
        main: '#111111',
        dark: '#000000',
        contrastText: '#ffffff',
    },
    secondary: {
        light: '#e0d0bb',
        main: '#000000',
        dark: '#835635',
        contrastText: '#ffffff',
    }
  }




const darkTheme = createTheme({
    ...myTheme,
    palette: {
        primary: {
            main: '#000000',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#000000',
            contrastText: '#ffffff',
        },
        background: {
          default: Colors.black,
        },
    },
    typography: {
        ...myTheme,
        body1: {
            ...myTheme.typography.body1,
            color: Colors.white,
        }
    }
});




  



export { Colors, darkTheme };