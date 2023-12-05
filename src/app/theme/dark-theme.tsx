import { createTheme } from "@mui/material";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: '#000000',
            main: '#000000',
            dark: '#acbc99',
            contrastText: '#ffffff',
        },
        secondary: {
          light: '#d1b894',
          main: '#000000',
          dark: '#577e72',
          contrastText: '#ffffff',
        },
        background: {
          default: '#293133',
        },
    },
    breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1300,
          xl: 1536,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                body {
                    margin: 0;
                }
            `,
        },
        
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    '&:hover': {
                        color: '#0000000',
                        background: 'transparent',
                      },
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '30px 20px 40px 20px',
                }
            }
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    position: 'fixed',
                    right: '30px',
                    zIndex: 9999,
                    bottom: '30px',
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
        MuiRating: {
            styleOverrides: {
                root: {
                    paddingBottom: '20px',
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                }
            }
        },
        MuiList: {
            styleOverrides: {
                root: {
                    padding: 0,
                }
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    padding: '8px 0px 6px 0px',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                    '&:last-child': {
                        padding: '8px 0px 0px 0px',
                        borderBottom: 0,
                      },
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    margin: '0px 0px 10px 0px',
                    borderRadius: '0 !important',
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    borderRadius: '0 !important',
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    fontWeight: 400,
                    fontSize: 15,
                    letterSpacing: 1.3,
                    padding: '10px 25px 6px 25px',
                    fontFamily: 'Josefin Sans, sans-serif',
                    borderColor: '#95c5b0',
                    borderWidth: '1px',
                    color: '#95c5b0',
                    '&:hover': {
                        backgroundColor: 'transparent',
                        color: '#95c5b0',
                      },
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    fontWeight: 400,
                    fontSize: 15,
                    textTransform: 'uppercase',
                    letterSpacing: 1.3,
                    padding: '14px 20px 10px 20px',
                    fontFamily: 'Josefin Sans, sans-serif',
                    margin: 0,
                    '&:hover': {
                        backgroundColor: '#95c5b0',
                        color: '#ffffff'
                      },
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
            color: '#ffffff',
        },
        caption: {
            fontSize: 18,
            lineHeight: 1.3,
            marginBottom: 10,
            fontWeight: 400,
        },
        subtitle1: {
            fontSize: 15,
            lineHeight: 1.3,
            marginBottom: 15,
            fontWeight: 600,
            color: "#acbc99",
            letterSpacing: 0,
        },
        h1: {
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: 40,
            marginBottom: 20,
            lineHeight: 1.4,
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            color: '#ffffff'
        },
        h2: {
            fontFamily: 'Josefin Sans, sans-serif',
            fontWeight: 600,
            fontSize: 26,
            marginBottom: 10,
            textTransform: "uppercase",
            letterSpacing: 1.7,
            color: '#ffffff'
        },
        h3: {
            fontFamily: 'Josefin Sans, sans-serif',
            fontWeight: 400,
            fontSize: 24,
            marginBottom: 10,
            marginTop: 4,
            textTransform: "uppercase",
            letterSpacing: 1,
            color: '#ffffff',
            a: {
                color: '#373737',
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
});



export { darkTheme };
