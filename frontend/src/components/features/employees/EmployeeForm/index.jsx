import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, FormControlLabel, Switch, Box
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useEmployees} from "../../../../hooks/useEmployees.js";

const validationSchema = Yup.object({
    firstName: Yup.string().required('El nombre es requerido'),
    lastName: Yup.string().required('El apellido es requerido'),
    employeeCode: Yup.string().required('El codigo de empleado es requerido'),
    email: Yup.string().email('Email invalido').required('El email es requerido'),
});

export const EmployeeForm = ({ open, onClose, employee }) => {
    const { createEmployee, updateEmployee } = useEmployees();
    const isEditing = Boolean(employee);

    const formik = useFormik({
        initialValues: {
            firstName: employee?.firstName || '',
            lastName: employee?.lastName || '',
            employeeCode: employee?.employeeCode || '',
            email: employee?.email || '',
            active: employee?.active ?? true,
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                if (isEditing) {
                    await updateEmployee(employee?.id, values);
                } else {
                    await createEmployee(values);
                }
                onClose();
            } catch (error) {
                console.error('Error al guardar empleado', error);
            }
        },
    });

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {isEditing ? 'Editar Empleado' : 'Nuevo Empleado'}
            </DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            fullWidth
                            id="firstName"
                            name="firstName"
                            label="Nombre"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                        <TextField
                            fullWidth
                            id="lastName"
                            name="lastName"
                            label="Apellido"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                        <TextField
                            fullWidth
                            id="employeeCode"
                            name="employeeCode"
                            label="Código de Empleado"
                            value={formik.values.employeeCode}
                            onChange={formik.handleChange}
                            error={formik.touched.employeeCode && Boolean(formik.errors.employeeCode)}
                            helperText={formik.touched.employeeCode && formik.errors.employeeCode}
                        />
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formik.values.active}
                                    onChange={(e) => formik.setFieldValue('active', e.target.checked)}
                                    name="active"
                                    disabled={employee?.isInside}
                                />
                            }
                            label="Activo"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button type="submit" variant="contained" color="primary">
                        Guardar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
