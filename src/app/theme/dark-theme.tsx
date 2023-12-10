import { Button, Card, List, ListItem, createTheme } from "@mui/material";
import { myTheme } from "./my-theme";
import styled from "@emotion/styled";


const darkTheme = createTheme({
    ...myTheme,
    palette: {
        primary: {
            light: '#0099d0',
            main: '#251820',
            dark: '#0c00ff',
            contrastText: '#ffffff',
        },
        secondary: {
          light: '#ffffff',
          main: '#ff6800',
          dark: '#8b542e',
          contrastText: '#ffffff',
        },
        background: {
          default: '#000000',
        },
    },
    typography: {
        ...myTheme.typography,
        body1: {
            ...myTheme.typography.body1,
            color: '#ffffff',
        },
        subtitle1: {
            ...myTheme.typography.subtitle1,
            color: "#ffffff",
        },
        h1: {
            ...myTheme.typography.h1,
            color: '#c7a072'
        },
        h2: {
            ...myTheme.typography.h2,
            color: '#ffffff',
            a: {
                color: '#ffffff',
            },
        },
        h3: {
            ...myTheme.typography.h3,
            color: '#ffffff'
        },
    },
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    '&:hover': {
                        color: '#ffffff',
                        background: 'transparent',
                      },
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: '#190210'
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    background: '#1e1e1e',
                }
            }
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    color: '#ffffff',
                    background: '#000000',
                    '&:hover': {
                        background: '#9ca8c7',
                      },
                }
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid rgba(255, 255, 255)',
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderColor: '#ffffff',
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: '#ffffff',
                        borderColor: '#ffffff',
                        color: '#ffffff',
                      },
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#c3b0a5',
                        color: '#ffffff'
                      },
                },
            },
        },
    },
});







const StyledTagButton = styled(Button)(() => ({
    backgroundColor: darkTheme.palette.primary.main,
    color: '#ffffff',
    ":hover": {
        backgroundColor: darkTheme.palette.secondary.main,
        color: '#ffffff',
    }
  }));

  

  const AddListItem = styled(ListItem)(() => ({
    color: '#d32c26 !important',
    padding: '10px 20px 0px 20px',
}));


  const IconStyle = {
    color: '#a4a2a1',
  };



  const AddButton = styled(Button)(() => ({
    color: myTheme.palette.secondary.main,
    ":hover": {
        color: myTheme.palette.secondary.dark,
        background: 'transparent',
    }
  }));

  const DeleteButton = styled(Button)(() => ({
    background: 'transparent',
    ":hover": {
        color: myTheme.palette.secondary.dark,
        background: 'transparent',
    }
  }));




  const ZutatenCard = styled(Card)(() => ({
    background: '#ffffff',
  }));



  const AddList = styled(List)(() => ({
    background: '#ffffff',
  }));



  



export { darkTheme, IconStyle, AddList, DeleteButton, AddListItem, StyledTagButton, ZutatenCard, AddButton };


