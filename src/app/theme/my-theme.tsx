import styled from "@emotion/styled";
import { Button, Card, CardMedia, Container, Grid, createTheme } from "@mui/material";



const TagButton = styled(Button)(() => ({
    backgroundColor: '#8e735b',
    borderRadius: '20px',
    fontSize: '12px',
    margin: '0px 5px 5px 0px',
    fontWeight: '700',
    letterSpacing: 0.8,
    padding: '3px 13px 3px 13px',
    color: '#ffffff',
    fontFamily: 'Work Sans, sans-serif',
    ":hover": {
        backgroundColor: '#593d24',
    }
  }));


  const IconStyle = {
    color: '#a4a2a1',
  };



  const AddButton = styled(Button)(() => ({
    backgroundColor: '#8e735b',
    letterSpacing: 0.8,
    padding: '0',
    margin: 0,
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    color: '#ffffff',
    boxSizing: 'border-box',
    ":hover": {
        backgroundColor: '#000000',
    }
  }));


  const MainImage = styled(CardMedia)(() => ({
    margin: '0px',
    padding: '0px',
  }));



  const MainContainer = styled(Container)(() => ({
    padding: '70px 0px',
  }));



  const ZutatenCard = styled(Card)(() => ({
    margin: '0px 0px 20px 0px',
  }));


  const PaddContainer = styled(Container)(() => ({
    padding: '20px 0px 10px 0px',
  }));


  const ReadmoreButton = styled(Button)(() => ({
    margin: '10px 0px 0px 0px',
  }));



  

const myTheme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                body {
                    margin: 0;
                }
            `,
        },
        MuiCardMedia: {
            styleOverrides: {
                root: {
                    margin: '0 0 15px 0',
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                }
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    padding: '10px 0px',
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    margin: '0px 0px 10px 0px',
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    fontWeight: 500,
                    fontSize: 15,
                    letterSpacing: 1.3,
                    padding: '6px 25px 6px 25px',
                    fontFamily: 'Work Sans, sans-serif',
                    borderColor: '#000000',
                    borderWidth: '1px'
                },
            },
        },
    },
    typography: {
        fontFamily: 'Quattrocento, serif',
        body1: {
            fontSize: 18,
            lineHeight: 1.5,
            marginBottom: 10,
            fontWeight: 300,
        },
        body2: {
            fontSize: 18,
            lineHeight: 1.5,
            marginBottom: 10,
            color: '#ffffff',
        },
        caption: {
            fontSize: 25,
            lineHeight: 1.3,
            marginBottom: 10,
            fontWeight: 700,
            fontFamily: 'Quattrocento, serif',
        },
        subtitle1: {
            fontSize: 15,
            lineHeight: 1.3,
            marginBottom: 15,
            fontWeight: 400,
            color: "#8e735b",
            letterSpacing: 0,
            fontFamily: 'Work Sans, sans-serif',
        },
        h1: {
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: 33,
            marginBottom: 10,
            lineHeight: 1.4,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 1.5,
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
            fontSize: 22,
            marginBottom: 10,
            marginTop: 4,
            textTransform: "uppercase",
            letterSpacing: 1,
            a: {
                color: '#000000',
                textDecoration: 'none',
            },
        },
        h4: {
            fontWeight: 600,
            fontSize: 18,
        },
        h5: {
            fontFamily: 'Josefin Sans, sans-serif',
            fontWeight: 600,
            fontSize: 18,
            marginBottom: 5,
            marginTop: 4,
            textTransform: "uppercase",
            letterSpacing: 1,
        },
    },
    palette: {
        primary: {
            light: '#757ce8',
            main: '#000000',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
          main: '#4f2f20',
        },
        background: {
          default: '#f5f5f5',
        },
    },
});

export { IconStyle, MainContainer, TagButton, ReadmoreButton, ZutatenCard, AddButton, PaddContainer, MainImage, myTheme };
