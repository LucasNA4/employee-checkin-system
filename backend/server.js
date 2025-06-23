const app = require('./src/app');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 3001;

async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Sincronizacion de la base de datos completada.');
  } catch (error) {
    console.error('Error al sincronizar con la base de datos:', error);
  }
}

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexion a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('Error al conectarse a la base de datos', error);
  }
}

async function startServer() {
  await testConnection();
  await syncDatabase();
  
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}

startServer();