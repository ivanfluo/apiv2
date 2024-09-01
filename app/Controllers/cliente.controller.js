const db = require('../Config/db.config.js');
const Cliente = db.Cliente;

exports.CrearCliente = (req, res) => {
  let cliente = {};

  try {
    cliente.nombre = req.body.nombre;
    cliente.apellido = req.body.apellido;
    cliente.razonSocial = req.body.razonSocial;
    cliente.nit = req.body.nit;
    cliente.direccion = req.body.direccion;
    cliente.telefono = req.body.telefono;
    cliente.email = req.body.email;
    cliente.estatus = req.body.estatus;

    Cliente.create(cliente).then((result) => {
      res.status(200).json({
        message: `Registro creado exitosamente con id = ${result.idCliente}`,
        cliente: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al momento de crear!",
      error: error.message,
    });
  }
};

exports.retrieveAllCliente = (req, res) => {
  Cliente.findAll()
    .then(clienteInfo => {
      res.status(200).json({
        message: "Clientes recuperados exitosamente!",
        cliente: clienteInfo
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error al obtener Clientes!",
        error: error.message
      });
    });
};

exports.ObtenerClienteId = (req, res) => {
  let clienteId = req.params.idCliente;
  Cliente.findByPk(clienteId)
    .then(cliente => {
      if (cliente) {
        res.status(200).json({
          message: `cliente obtenido con id = ${clienteId}`,
          cliente: cliente
        });
      } else {
        res.status(404).json({
          message: `No se encontró el cliente con id = ${clienteId}`
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "No fue posible obtener el cliente",
        error: error.message
      });
    });
};

exports.ActualizarCliente = async (req, res) => {
  try {
    let clienteId = req.params.idCliente;
    let cliente = await Cliente.findByPk(clienteId);

    if (!cliente) {
      res.status(404).json({
        message: `No fue posible actualizar el cliente con id = ${clienteId}`,
        cliente: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        razonSocial: req.body.razonSocial,
        nit: req.body.nit,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email,
        estatus: req.body.estatus
      };

      let result = await Cliente.update(updatedObject, { returning: true, where: { id: clienteId } });

      if (!result) {
        res.status(500).json({
          message: "Error -> No fue posible actualizar el Cliente con id = " + req.params.idCliente,
          error: "Can NOT Updated"
        });
      }

      res.status(200).json({
        message: `Cliente actualizado con éxito, id = ${clienteId}`,
        cliente: updatedObject
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el Cliente con id = " + req.params.idCliente,
      error: error.message
    });
  }
};

exports.EliminarCliente = async (req, res) => {
  try {
    let clienteId = req.params.id;
    let cliente = await Cliente.findByPk(clienteId);

    if (!cliente) {
      res.status(404).json({
        message: `No existe el cliente con id = ${clienteId}`,
        error: "404"
      });
    } else {
      await cliente.destroy();
      res.status(200).json({
        message: `Cliente eliminado con éxito, id = ${clienteId}`,
        cliente: cliente
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el cliente con id = " + req.params.idCliente,
      error: error.message
    });
  }
};