module.exports = (sequelize, Sequelize) => {
    const Factura = sequelize.define("factura", {
      
      idFactura: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      noFactura: {
        type: Sequelize.INTEGER,
      },
      serie: {
        type: Sequelize.STRING,
      },
      ClienteId: {
        type: Sequelize.INTEGER,
      },
      EmpleadoId: {
        type: Sequelize.INTEGER,
      },
      fechaFactura: {
        type: Sequelize.DATE,
      }
    });
    return Factura;
  };
  