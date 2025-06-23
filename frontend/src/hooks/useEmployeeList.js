import { useCallback, useState } from "react";
import { useEmployees } from "./useEmployees.js";

const confirmDeleteInitialState = {
    open: false,
    id: null,
};

export const useEmployeeList = () => {
    const { employees, loading, fetchEmployees, deleteEmployee } = useEmployees();
    const [openForm, setOpenForm] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(confirmDeleteInitialState);

    const handleAddEmployee = useCallback(() => {
        setSelectedEmployee(null);
        setOpenForm(true);
    }, []);

    const handleEditEmployee = useCallback((employee) => {
        setSelectedEmployee(employee);
        setOpenForm(true);
    }, []);

    const handleDeleteClick = useCallback((id) => {
        setConfirmDelete({ open: true, id });
    }, []);

    const handleConfirmDelete = useCallback(async () => {
        if (confirmDelete.id) {
            await deleteEmployee(confirmDelete.id);
        }
    }, [confirmDelete, deleteEmployee]);

    const handleFormClose = useCallback(() => {
        setOpenForm(false);
        setSelectedEmployee(null);
        fetchEmployees();
    }, [fetchEmployees]);

    const handleResetConfirmDelete = useCallback(() => {
        setConfirmDelete(confirmDeleteInitialState);
    }, []);

    return {
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
    };
};
