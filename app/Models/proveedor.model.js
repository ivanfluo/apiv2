module.exports = (sequelize, Sequelize) => {
    const Proveedor = sequelize.define("proveedor", {
      
      idProveedor: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      empresa: {
        type: Sequelize.STRING,
      },
      direccion: {
        type: Sequelize.STRING,
      },
      telefono: {
        type: Sequelize.INTEGER,
      },
      nit: {
        type: Sequelize.STRING,
      },
      ciudad: {
        type: Sequelize.STRING,
      },
      pais: {
        type: Sequelize.STRING,
      },
      contacto: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      telefonoContacto: {
        type: Sequelize.INTEGER,
      },
      estatus: {
        type: Sequelize.INTEGER,
      },
    });
    return Proveedor;
  };
  