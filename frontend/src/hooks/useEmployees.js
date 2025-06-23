import { useState, useCallback } from 'react';
import { employeeService } from '../services/api';
import { MESSAGES } from '../utils/Constants';

export const useEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await employeeService.getAll();
            setEmployees(response.data);
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || MESSAGES.ERROR.FETCH_EMPLOYEES);
        } finally {
            setLoading(false);
        }
    }, []);

    const getEmployeeById = useCallback(async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await employeeService.getById(id);
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || MESSAGES.ERROR.GENERIC);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const createEmployee = useCallback(async (employeeData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await employeeService.create(employeeData);
            await fetchEmployees();
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || MESSAGES.ERROR.CREATE_EMPLOYEE);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [fetchEmployees]);

    const updateEmployee = useCallback(async (id, employeeData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await employeeService.update(id, employeeData);
            await fetchEmployees();
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || MESSAGES.ERROR.UPDATE_EMPLOYEE);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [fetchEmployees]);

    const deleteEmployee = useCallback(async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await employeeService.delete(id);
            await fetchEmployees();
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || MESSAGES.ERROR.DELETE_EMPLOYEE);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [fetchEmployees]);

    const getActiveEmployees = useCallback(() => {
        return employees.filter(emp => emp.active);
    }, [employees]);

    return {
        employees,
        loading,
        error,
        fetchEmployees,
        getEmployeeById,
        createEmployee,
        updateEmployee,
        deleteEmployee,
        getActiveEmployees
    };
};
