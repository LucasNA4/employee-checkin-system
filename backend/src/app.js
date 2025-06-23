const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
const recordRoutes = require('./routes/recordRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/employees', employeeRoutes);
app.use('/api/records', recordRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de Employee Check-in System' });
});

module.exports = app;