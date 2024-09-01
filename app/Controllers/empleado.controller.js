const db = require('../Config/db.config.js');
const Empleado = db.Empleado;

exports.CrearEmpleado = (req, res) => {
  let empleado = {};

  try {
    empleado.primer_nombre = req.body.primer_nombre;
    empleado.segundo_nombre = req.body.segundo_nombre;
    empleado.primer_apellido = req.body.primer_apellido;
    empleado.segundo_apellido = req.body.segundo_apellido;
    empleado.nit = req.body.nit;
    empleado.salario = req.body.salario;
    empleado.estatus = req.body.estatus;
    empleado.DepartamentoId = req.body.DepartamentoId;

    Empleado.create(empleado).then((result) => {
      res.status(200).json({
        message: `Registro creado exitosamente con id = ${result.id}`,
        empleado: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al momento de crear!",
      error: error.message,
    });
  }
};

exports.retrieveAllEmpleado = (req, res) => {
  Empleado.findAll()
    .then(empleadoInfo => {
      res.status(200).json({
        message: "Empleados recuperados exitosamente!",
        empleado: empleadoInfo
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error al obtener Empleados!",
        error: error.message
      });
    });
};

exports.ObtenerEmpleadoId = (req, res) => {
  let empleadoId = req.params.idEmpleado;
  Empleado.findByPk(empleadoId)
    .then(empleado => {
      if (empleado) {
        res.status(200).json({
          message: `Empleado obtenido con id = ${empleadoId}`,
          empleado: empleado
        });
      } else {
        res.status(404).json({
          message: `No se encontró el empleado con id = ${empleadoId}`
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "No fue posible obtener el empleado",
        error: error.message
      });
    });
};

exports.ActualizarEmpleado = async (req, res) => {
  try {
    let empleadoId = req.params.idEmpleado;
    let empleado = await Empleado.findByPk(empleadoId);

    if (!empleado) {
      res.status(404).json({
        message: `No fue posible actualizar el empleado con id = ${empleadoId}`,
        empleado: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        primer_nombre: req.body.primer_nombre,
        segundo_nombre: req.body.segundo_nombre,
        primer_apellido: req.body.primer_apellido,
        segundo_apellido: req.body.segundo_apellido,
        nit: req.body.nit,
        salario: req.body.salario,
        estatus: req.body.estatus,
        DepartamentoId: req.body.DepartamentoId,
      };
      let result = await Empleado.update(updatedObject, { returning: true, where: { id: empleadoId } });

      if (!result) {
        res.status(500).json({
          message: "Error -> No fue posible actualizar el Empleado con id = " + req.params.idEmpleado,
          error: "Can NOT Updated"
        });
      }

      res.status(200).json({
        message: `Empleado actualizado con éxito, id = ${empleadoId}`,
        empleado: updatedObject
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el Empleado con id = " + req.params.idEmpleado,
      error: error.message
    });
  }
};

exports.EliminarEmpleado = async (req, res) => {
  try {
    let empleadoId = req.params.id;
    let empleado = await empleado.findByPk(empleadoId);

    if (!empleado) {
      res.status(404).json({
        message: `No existe el empleado con id = ${empleadoId}`,
        error: "404"
      });
    } else {
      await empleado.destroy();
      res.status(200).json({
        message: `Empleado eliminado con éxito, id = ${empleadoId}`,
        empleado: empleado
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el empleado con id = " + req.params.idEmpleado,
      error: error.message
    });
  }
};