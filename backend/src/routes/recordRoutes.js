const express = require('express');
const recordController = require('../controllers/recordController');

const router = express.Router();

router.get('/', recordController.getAllRecords);
router.post('/', recordController.createRecord);
router.get('/employees-inside', recordController.getEmployeesInside);

module.exports = router;