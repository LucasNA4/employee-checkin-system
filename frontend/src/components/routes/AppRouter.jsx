import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CheckInOut, CurrentEmployees, EmployeeList } from "../features/index.js";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<CheckInOut />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/current" element={<CurrentEmployees />} />
        </Routes>
    );
};