const env = require("./env.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
  pool: {
    max: env.pool.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Departamento = require('../Models/departamento.model.js')(sequelize, Sequelize);
db.Empleado = require('../Models/empleado.model.js')(sequelize, Sequelize);
db.Cliente = require('../Models/cliente.model.js')(sequelize, Sequelize);
db.Producto = require('../Models/producto.model.js')(sequelize, Sequelize);
db.Proveedor = require('../Models/proveedor.model.js')(sequelize, Sequelize);
db.Factura = require('../Models/factura.model.js')(sequelize, Sequelize);
db.FacturaDetalle = require('../Models/factura_detalle.model.js')(sequelize, Sequelize);

module.exports = db;
