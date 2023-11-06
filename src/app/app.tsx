import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Container from '@mui/material/Container';
import Header from './components/header';
import AppRoutes from "./routes/routes";
import myTheme from './theme/my-theme';
import Footer from './components/footer';
import { StoreProvider } from './store/StoreProvider';


const App = () => {

    return (
        <div className="App">
            <StoreProvider>
                <ThemeProvider theme={myTheme}>
                    <CssBaseline/>
                    <Header user={null} />
                    <Box
                        sx={{
                            pt: 8,
                            pb: 8,
                        }}
                        >
                        <Container maxWidth="lg">
                            <AppRoutes/>
                        </Container>
                    </Box>
                    <Footer />
                </ThemeProvider>
            </StoreProvider>
        </div>
    );
}

export default App;
