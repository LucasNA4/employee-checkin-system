import React from 'react';
import { Box, Typography } from '@mui/material';

export const PageHeader = ({
    title,
    actionButton = null,
    sx = {}
}) => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            ...sx
        }}
    >
        <Typography variant="h4">{title}</Typography>
        {actionButton}
    </Box>
);