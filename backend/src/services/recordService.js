const Record = require('../models/Record');
const Employee = require('../models/Employee');

/**
 * Obtiene todos los registros con informacion de empleados
 * @returns {Promise<Array>} Lista de registros
 */
exports.getAllRecords = async () => {
  return await Record.findAll({
    include: [{ model: Employee }]
  });
};

/**
 * Obtiene el ultimo registro de un empleado
 * @param {number} employeeId - ID del empleado
 * @returns {Promise<Object|null>} Ultimo registro o null
 */
exports.getLastEmployeeRecord = async (employeeId) => {
  return await Record.findOne({
    where: { employeeId },
    order: [['registeredDateTime', 'DESC']]
  });
};

/**
 * Valida si un empleado puede crear un registro del tipo especificado
 * @param {Object} employee - Instancia del empleado
 * @param {string} recordType - Tipo de registro (INGRESO/EGRESO)
 * @returns {Object} Resultado de la validación
 */
exports.validateRecordCreation = (employee, recordType) => {
  if (!employee) {
    return { valid: false, message: 'Empleado no encontrado' };
  }

  if (!['INGRESO', 'EGRESO'].includes(recordType)) {
    return {
      valid: false,
      message: 'El tipo de registro ingresado no es valido. Debe ser "INGRESO" o "EGRESO".'
    };
  }

  if (employee.active === false) {
    return {
      valid: false,
      message: 'No se puede crear un registro para un empleado inactivo'
    };
  }

  if (employee.isInside && recordType === 'INGRESO') {
    return {
      valid: false,
      message: 'No se puede registrar un ingreso para un empleado que ya esta dentro'
    };
  }

  if (!employee.isInside && recordType === 'EGRESO') {
    return {
      valid: false,
      message: 'No se puede registrar un egreso para un empleado que no esta dentro'
    };
  }

  return { valid: true };
};

/**
 * Calcula la duracion de la estancia de un empleado
 * @param {Object} lastRecord - Ultimo registro del empleado
 * @param {string} registeredDateTime - Fecha y hora del registro actual
 * @returns {number|null} Duracion en minutos o null
 */
exports.calculateDuration = (lastRecord, registeredDateTime) => {
  if (!lastRecord) return null;
  
  const checkInTime = new Date(lastRecord.registeredDateTime);
  const checkOutTime = new Date(registeredDateTime);
  return Math.round((checkOutTime - checkInTime) / (1000 * 60));
};

/**
 * Verifica si hay advertencias basadas en la duracion
 * @param {string} recordType - Tipo de registro
 * @param {number|null} duration - Duracion en minutos
 * @returns {string|null} Mensaje de advertencia o null
 */
exports.checkDurationWarnings = (recordType, duration) => {
  if (recordType === 'EGRESO' && duration > 480) {
    return 'Advertencia: La duracion de la estancia es mayor a 8 horas';
  }
  return null;
};

/**
 * Formatea la duracion para mostrar en horas y minutos
 * @param {number|null} duration - Duracion en minutos
 * @returns {string|null} Duración formateada o null
 */
exports.formatDuration = (duration) => {
  if (!duration) return null;
  return `${Math.floor(duration / 60)}h ${duration % 60}m`;
};

/**
 * Crea un nuevo registro
 * @param {Object} recordData - Datos del registro
 * @returns {Promise<Object>} Registro creado
 */
exports.createRecord = async (recordData) => {
  return await Record.create(recordData);
};

/**
 * Obtiene los empleados que están actualmente dentro
 * @returns {Promise<Array>} Lista de empleados dentro
 */
exports.getEmployeesInside = async () => {
  return await Employee.findAll({
    where: {
      isInside: true,
      active: true
    },
    include: [{
      model: Record,
      required: false,
      where: {
        recordType: 'INGRESO'
      },
      limit: 1,
      order: [['registeredDateTime', 'DESC']]
    }]
  });
};
