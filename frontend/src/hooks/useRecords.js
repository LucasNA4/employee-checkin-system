import { useState, useCallback } from 'react';
import { recordService } from '../services/api';
import { MESSAGES, RECORD_TYPES } from '../utils/Constants';

export const useRecords = () => {
    const [records, setRecords] = useState([]);
    const [employeesInside, setEmployeesInside] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRecords = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await recordService.getAll();
            setRecords(response.data);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || MESSAGES.ERROR.GENERIC;
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchEmployeesInside = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await recordService.getEmployeesInside();
            setEmployeesInside(response.data);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || MESSAGES.ERROR.GENERIC;
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const createRecord = useCallback(async (recordData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await recordService.create(recordData);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message ||
                (recordData.recordType === RECORD_TYPES.CHECK_IN ?
                    MESSAGES.ERROR.CHECK_IN :
                    MESSAGES.ERROR.CHECK_OUT);

            setError(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        records,
        employeesInside,
        loading,
        error,
        fetchRecords,
        fetchEmployeesInside,
        createRecord
    };
};
