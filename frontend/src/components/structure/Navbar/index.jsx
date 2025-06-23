import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';

export const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Sistema de Registro de Empleados
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/">
                        Ingreso/Egreso
                    </Button>
                    <Button color="inherit" component={Link} to="/employees">
                        Empleados
                    </Button>
                    <Button color="inherit" component={Link} to="/current">
                        Presentes
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};