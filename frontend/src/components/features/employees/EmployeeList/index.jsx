import React, { useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, Box, IconButton
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { ConfirmDialog, LoadingIndicator, PageHeader } from "../../../common/index.js";
import { EmployeeForm } from "../EmployeeForm/index.jsx";
import { useEmployeeList } from "../../../../hooks/useEmployeeList.js";

export const EmployeeList = () => {
    const {
        employees,
        loading,
        openForm,
        selectedEmployee,
        fetchEmployees,
        confirmDelete,
        handleAddEmployee,
        handleEditEmployee,
        handleDeleteClick,
        handleConfirmDelete,
        handleFormClose,
        handleResetConfirmDelete
    } = useEmployeeList();

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const addButton = (
        <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddEmployee}
            disabled={loading}
        >
            Nuevo Empleado
        </Button>
    );

    if (loading && employees.length === 0) {
        return (
            <Box sx={{ p: 3 }}>
                <PageHeader title="Gestión de Empleados" actionButton={addButton} />
                <LoadingIndicator />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <PageHeader title="Gestión de Empleados" actionButton={addButton} />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees?.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>{employee.employeeCode}</TableCell>
                                <TableCell>{employee.firstName}</TableCell>
                                <TableCell>{employee.lastName}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.active ? 'Activo' : 'Inactivo'}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditEmployee(employee)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteClick(employee.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {openForm && (
                <EmployeeForm
                    open={openForm}
                    onClose={handleFormClose}
                    employee={selectedEmployee}
                />
            )}

            <ConfirmDialog
                open={confirmDelete.open}
                onClose={handleResetConfirmDelete}
                onConfirm={handleConfirmDelete}
                title="Confirmar eliminacion"
                message="Esta seguro que desea eliminar este empleado?"
                confirmText="Eliminar"
                cancelText="Cancelar"
            />
        </Box>
    );
};
