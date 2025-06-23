import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper,
    Button, TextField, Alert, Stack
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PageHeader, SelectField } from "../../../common/index.js";
import { RECORD_TYPES } from "../../../../utils/Constants.js";
import { useEmployees } from "../../../../hooks/useEmployees.js";
import { useRecords } from "../../../../hooks/useRecords.js";

const validationSchema = Yup.object({
    employeeId: Yup.number().required('Debe seleccionar un empleado'),
    recordType: Yup.string().required('Debe seleccionar un tipo de registro'),
    registeredDateTime: Yup.date().required('Debe seleccionar fecha y hora'),
});

export const CheckInOut = () => {
    const { employees, fetchEmployees } = useEmployees();
    const { loading, createRecord } = useRecords();
    const [responseMessage, setResponseMessage] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const employeeOptions = employees.map(emp => ({
        value: emp.id,
        label: `${emp.firstName} ${emp.lastName} (${emp.employeeCode})`
    }));

    const recordTypeOptions = [
        { value: RECORD_TYPES.CHECK_IN, label: 'Ingreso' },
        { value: RECORD_TYPES.CHECK_OUT, label: 'Egreso' }
    ];

    const formik = useFormik({
        initialValues: {
            employeeId: '',
            recordType: '',
            registeredDateTime: new Date(),
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            setResponseMessage(null);

            try {
                const data = await createRecord(values);

                setResponseMessage({
                    type: 'success',
                    message: `Registro de ${values.recordType === RECORD_TYPES.CHECK_IN ? 'ingreso' : 'egreso'} exitoso`,
                    details: data.warning ? data.warning : '',
                    duration: data.duration
                });

                resetForm();
            } catch (error) {
                setResponseMessage({
                    type: 'error',
                    message: error.response?.data?.message || 'Error al registrar',
                });
            }
        },
    });

    return (
        <Box sx={{ p: 3 }}>
            <PageHeader
                title="Registro de Ingreso/Egreso"
                sx={{ display: '', textAlign: 'center' }}
            />

            <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={4}>
                        <SelectField
                            id="employeeId"
                            name="employeeId"
                            label="Empleado"
                            value={formik.values.employeeId}
                            onChange={formik.handleChange}
                            options={employeeOptions}
                            error={formik.touched.employeeId && formik.errors.employeeId}
                            helperText={formik.touched.employeeId && formik.errors.employeeId}
                        />

                        <SelectField
                            id="recordType"
                            name="recordType"
                            label="Tipo de Registro"
                            value={formik.values.recordType}
                            onChange={formik.handleChange}
                            options={recordTypeOptions}
                            error={formik.touched.recordType && formik.errors.recordType}
                            helperText={formik.touched.recordType && formik.errors.recordType}
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                            <DateTimePicker
                                label="Fecha y Hora"
                                value={formik.values.registeredDateTime}
                                onChange={(value) => formik.setFieldValue('registeredDateTime', value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        sx={{ minHeight: '56px' }}
                                        error={formik.touched.registeredDateTime && Boolean(formik.errors.registeredDateTime)}
                                        helperText={formik.touched.registeredDateTime && formik.errors.registeredDateTime}
                                    />
                                )}
                            />
                        </LocalizationProvider>

                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{ minWidth: '200px', py: 1.5 }}
                                disabled={loading}
                            >
                                {loading ? 'Procesando...' : 'Registrar'}
                            </Button>
                        </Box>
                    </Stack>
                </form>

                {responseMessage && (
                    <Box sx={{ mt: 4 }}>
                        <Alert severity={responseMessage.type}>
                            <Typography variant="body1">{responseMessage.message}</Typography>
                            {responseMessage.details && (
                                <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold' }}>
                                    {responseMessage.details}
                                </Typography>
                            )}
                            {responseMessage.duration && (
                                <Typography variant="body2">
                                    Tiempo dentro de la compañía: {responseMessage.duration}
                                </Typography>
                            )}
                        </Alert>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};
