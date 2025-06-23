const recordService = require('../services/recordService');
const employeeService = require('../services/employeeService');

exports.getAllRecords = async (req, res) => {
  try {
    const records = await recordService.getAllRecords();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createRecord = async (req, res) => {
  try {
    const { employeeId, recordType, registeredDateTime } = req.body;

    const employee = await employeeService.getEmployeeById(employeeId);
    
    const validation = recordService.validateRecordCreation(employee, recordType);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const lastRecord = await recordService.getLastEmployeeRecord(employeeId);
    const duration = recordType === 'EGRESO'
      ? recordService.calculateDuration(lastRecord, registeredDateTime)
      : null;

    await employeeService.updateEmployeePresence(employee, recordType === 'INGRESO');

    const record = await recordService.createRecord({
      employeeId,
      recordType,
      registeredDateTime,
      actualDateTime: new Date(),
      duration
    });

    const warningMessage = recordService.checkDurationWarnings(recordType, duration);
    const formattedDuration = recordService.formatDuration(duration);

    res.status(201).json({
      record,
      duration: formattedDuration,
      warning: warningMessage
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEmployeesInside = async (req, res) => {
  try {
    const employeesInside = await recordService.getEmployeesInside();
    res.status(200).json(employeesInside);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
