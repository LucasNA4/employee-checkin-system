const Employee = require('../models/Employee');

/**
 * Obtiene todos los empleados
 * @returns {Promise<Array>} Lista de empleados
 */
exports.getAllEmployees = async () => {
    return await Employee.findAll();
};

/**
 * Obtiene un empleado por su ID
 * @param {number} id - ID del empleado
 * @returns {Promise<Object|null>} Empleado encontrado o null
 */
exports.getEmployeeById = async (id) => {
    return await Employee.findByPk(id);
};

/**
 * Crea un nuevo empleado
 * @param {Object} employeeData - Datos del empleado
 * @returns {Promise<Object>} Empleado creado
 */
exports.createEmployee = async (employeeData) => {
    return await Employee.create(employeeData);
};

/**
 * Actualiza un empleado existente
 * @param {number} id - ID del empleado
 * @param {Object} employeeData - Datos actualizados del empleado
 * @returns {Promise<Object>} Resultado de la operacion y empleado actualizado
 */
exports.updateEmployee = async (id, employeeData) => {
    const updated = await Employee.update(employeeData, {
        where: { id }
    });

    if (updated[0] === 0) {
        return { success: false, message: 'Empleado no encontrado' };
    }

    const employee = await Employee.findByPk(id);
    return { success: true, employee };
};

/**
 * Elimina un empleado
 * @param {number} id - ID del empleado
 * @returns {Promise<Object>} Resultado de la operacion
 */
exports.deleteEmployee = async (id) => {
    const deleted = await Employee.destroy({
        where: { id }
    });

    if (deleted === 0) {
        return { success: false, message: 'Empleado no encontrado' };
    }

    return { success: true, message: 'Empleado eliminado exitosamente' };
};

/**
 * Actualiza el estado de presencia de un empleado
 * @param {Object} employee - Instancia del empleado
 * @param {boolean} isInside - Nuevo estado de presencia
 * @returns {Promise<Object>} Empleado actualizado
 */
exports.updateEmployeePresence = async (employee, isInside) => {
    return await employee.update({ isInside });
};