const db = require('../Config/db.config.js');
const Departamento = db.Departamento;

exports.CrearDepartamento = (req, res) => {
  let departamento = {};
  try {
    departamento.descripcion = req.body.descripcion;
    Departamento.create(departamento).then((result) => {
      res.status(200).json({
        message: `Registro creado exitosamente con id = ${result.idDepartamento}`,
        departamento: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al momento de crear!",
      error: error.message,
    });
  }
};

exports.retrieveAllDepartamento = (req, res) => {
  Departamento.findAll()
    .then(deptoInfo => {
      res.status(200).json({
        message: "Departamentos recuperados exitosamente!.",
        departamento: deptoInfo
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error al obtener Departamentos.!",
        error: error.message
      });
    });
};

exports.ObtenerDepartamentoId = (req, res) => {
  let departamentoId = req.params.idDepartamento;
  Departamento.findByPk(departamentoId)
    .then(departamento => {
      if (departamento) {
        res.status(200).json({
          message: `departamento obtenido con id = ${departamentoId}`,
          departamento: departamento
        });
      } else {
        res.status(404).json({
          message: `No se encontró el departamento con id = ${departamentoId}`
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "No fue posible obtener el departamento",
        error: error.message
      });
    });
};

exports.ActualizarDepartamento = async (req, res) => {
  try {
    let departamentoId = req.params.idDepartamento.toObject;
    let departamento = await departamento.findByPk(departamentoId);

    if (!departamento) {
      res.status(404).json({
        message: `No fue posible actualizar el departamento con id = ${departamentoId}`,
        departamento: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        descripcion: req.body.descripcion
      };
      let result = await Departamento.update(updatedObject, { returning: true, where: { id: departamentoId } });

      if (!result) {
        res.status(500).json({
          message: "Error -> No fue posible actualizar el departamento con id = " + req.params.idDepartamento.id,
          error: "Can NOT Updated"
        });
      }

      res.status(200).json({
        message: `departamento actualizado con éxito, id = ${departamentoId}`,
        departamento: updatedObject
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el departamento con id = " + req.params.id,
      error: error.message
    });
  }
};

exports.EliminarDepartamento = async (req, res) => {
  try {
    let departamentoId = req.params.id;
    let departamento = await departamento.findByPk(departamentoId);

    if (!departamento) {
      res.status(404).json({
        message: `No existe el departamento con id = ${departamentoId}`,
        error: "404"
      });
    } else {
      await departamento.destroy();
      res.status(200).json({
        message: `departamento eliminado con éxito, id = ${departamentoId}`,
        departamento: departamento
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el departamento con id = " + req.params.idDepartamento,
      error: error.message
    });
  }
};