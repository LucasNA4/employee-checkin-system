import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { Navbar } from "./components/structure/index";
import { AppRouter } from "./components/routes/AppRouter";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                <CssBaseline />
                <Router>
                    <Navbar />
                    <Container sx={{ mt: 4 }}>
                        <AppRouter />
                    </Container>
                </Router>
            </LocalizationProvider>
        </ThemeProvider>
    );
}
