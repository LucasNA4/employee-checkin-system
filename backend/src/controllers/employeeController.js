const employeeService = require('../services/employeeService');

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const result = await employeeService.updateEmployee(req.params.id, req.body);
    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }
    res.status(200).json(result.employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const result = await employeeService.deleteEmployee(req.params.id);
    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }
    res.status(200).json({ message: result.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};