module.exports = (sequelize, Sequelize) => {
    const Empleado = sequelize.define("empleado", {
      
      idEmpleado: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      primer_nombre: {
        type: Sequelize.STRING,
      },
      segundo_nombre: {
        type: Sequelize.STRING,
      },
      primer_apellido: {
        type: Sequelize.STRING,
      },
      segundo_apellido: {
        type: Sequelize.STRING,
      },
      nit: {
        type: Sequelize.STRING,
      },
      salario: {
        type: Sequelize.DOUBLE,
      },
      estatus: {
        type: Sequelize.INTEGER,
      },
      DepartamentoId: {
        type: Sequelize.INTEGER,
      },
    });
  
    return Empleado;
  };
  