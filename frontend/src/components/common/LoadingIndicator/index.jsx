import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export const LoadingIndicator = ({ message = 'Cargando...' }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
        <CircularProgress />
        {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
);