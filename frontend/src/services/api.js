import axios from 'axios';

const API_CONFIG = {
    BASE_URL: 'http://localhost:3001/api',
    TIMEOUT: 10000,
    HEADERS: {
        'Content-Type': 'application/json',
    }
};

const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: API_CONFIG.HEADERS,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const employeeService = {
    getAll: () => api.get('/employees'),
    getById: (id) => api.get(`/employees/${id}`),
    create: (data) => api.post('/employees', data),
    update: (id, data) => api.put(`/employees/${id}`, data),
    delete: (id) => api.delete(`/employees/${id}`),
};

export const recordService = {
    getAll: () => api.get('/records'),
    create: (data) => api.post('/records', data),
    getEmployeesInside: () => api.get('/records/employees-inside'),
};
