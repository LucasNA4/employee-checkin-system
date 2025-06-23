import React, { useEffect } from 'react';
import {
    Box, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Button
} from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { LoadingIndicator, PageHeader } from "../../../common/index.js";
import { calculateTimeElapsed, formatDate } from "../../../../utils/dateUtils.js";
import { useRecords } from "../../../../hooks/useRecords.js";

export const CurrentEmployees = () => {
    const { employeesInside: employees, loading, fetchEmployeesInside } = useRecords();

    useEffect(() => {
        fetchEmployeesInside();
    }, [fetchEmployeesInside]);

    const refreshButton = (
        <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={fetchEmployeesInside}
            disabled={loading}
        >
            Actualizar
        </Button>
    );

    if (loading) {
        return (
            <Box sx={{ p: 3 }}>
                <PageHeader title="Empleados Presentes" actionButton={refreshButton} />
                <LoadingIndicator />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <PageHeader title="Empleados Presentes" actionButton={refreshButton} />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell>Hora de Ingreso</TableCell>
                            <TableCell>Tiempo Dentro</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No hay empleados dentro de la compañía en este momento
                                </TableCell>
                            </TableRow>
                        ) : (
                            employees.map((employee) => {
                                const checkInTime = employee.Records[0]?.registeredDateTime;
                                return (
                                    <TableRow key={employee.id}>
                                        <TableCell>{employee.employeeCode}</TableCell>
                                        <TableCell>{employee.firstName}</TableCell>
                                        <TableCell>{employee.lastName}</TableCell>
                                        <TableCell>{formatDate(checkInTime)}</TableCell>
                                        <TableCell>{calculateTimeElapsed(checkInTime)}</TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
