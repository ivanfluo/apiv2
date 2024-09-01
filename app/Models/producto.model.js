module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("producto", {
      
      idProducto: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      descripcion: {
        type: Sequelize.STRING,
      },
      stock: {
        type: Sequelize.INTEGER,
      },
      stockMinimo: {
        type: Sequelize.INTEGER,
      },
      precioUnitario: {
        type: Sequelize.FLOAT,
      },
      ProveedorId: {
        type: Sequelize.INTEGER,
      }
    });
    return Producto;
  };
  