import React from 'react';
import {
    FormControl,
    InputLabel,
    Select as MuiSelect,
    MenuItem,
    FormHelperText
} from '@mui/material';

export const SelectField = ({
    id,
    name,
    label,
    value,
    onChange,
    options = [],
    error,
    helperText,
    ...props
}) => (
    <FormControl
        fullWidth
        error={Boolean(error)}
        {...props}
    >
        <InputLabel id={`${id}-label`}>{label}</InputLabel>
        <MuiSelect
            labelId={`${id}-label`}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            label={label}
            variant="outlined"
            sx={{
                minHeight: '56px',
                '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center'
                }
            }}
         >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </MuiSelect>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
);