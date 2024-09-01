module.exports = (sequelize, Sequelize) => {
    const FacturaDetalle = sequelize.define("facturaDetalle", {
      
      idFacturaDetalle: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      FacturaId: {
        type: Sequelize.INTEGER,
      },
      idLinea: {
        type: Sequelize.INTEGER,
      },
      ProductoId: {
        type: Sequelize.INTEGER,
      },
      cantidad: {
        type: Sequelize.INTEGER,
      }
    });
    return FacturaDetalle;
  };
  