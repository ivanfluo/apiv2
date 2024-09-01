const db = require('../Config/db.config.js');
const Proveedor = db.Proveedor;

exports.CrearProveedor = (req, res) => {
  let proveedor = {};

  try {
    proveedor.empresa = req.body.empresa;
    proveedor.direccion = req.body.direccion;
    proveedor.telefono = req.body.telefono;
    proveedor.nit = req.body.nit;
    proveedor.ciudad = req.body.ciudad;
    proveedor.pais = req.body.pais;
    proveedor.contacto = req.body.contacto;
    proveedor.email = req.body.email;
    proveedor.telefonoContacto = req.body.telefonoContacto;
    proveedor.estatus = req.body.estatus;

    Proveedor.create(proveedor).then((result) => {
      res.status(200).json({
        message: `Registro creado exitosamente con id = ${result.idProveedor}`,
        proveedor: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al momento de crear!",
      error: error.message,
    });
  }
};

exports.retrieveAllProveedor = (req, res) => {
  Proveedor.findAll()
    .then(proveedorInfo => {
      res.status(200).json({
        message: "Proveedores recuperados exitosamente!",
        proveedor: proveedorInfo
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error al obtener Proveedores!",
        error: error.message
      });
    });
};

exports.ObtenerProveedorId = (req, res) => {
  let proveedorId = req.params.idProveedor;
  Proveedor.findByPk(proveedorId)
    .then(proveedor => {
      if (proveedor) {
        res.status(200).json({
          message: `proveedor obtenido con id = ${proveedorId}`,
          proveedor: proveedor
        });
      } else {
        res.status(404).json({
          message: `No se encontró el proveedor con id = ${proveedorId}`
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "No fue posible obtener el proveedor",
        error: error.message
      });
    });
};

exports.ActualizarProveedor = async (req, res) => {
  try {
    let proveedorId = req.params.idProveedor;
    let proveedor = await Proveedor.findByPk(proveedorId);

    if (!proveedor) {
      res.status(404).json({
        message: `No fue posible actualizar el proveedor con id = ${proveedorId}`,
        proveedor: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        empresa: req.body.empresa,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        nit: req.body.nit,
        ciudad: req.body.ciudad,
        pais: req.body.pais,
        contacto: req.body.contacto,
        email: req.body.email,
        telefonoContacto: req.body.telefonoContacto,
        estatus: req.body.estatus
      };

      let result = await Proveedor.update(updatedObject, { returning: true, where: { id: proveedorId } });

      if (!result) {
        res.status(500).json({
          message: "Error -> No fue posible actualizar el proveedor con id = " + req.params.idProveedor,
          error: "Can NOT Updated"
        });
      }

      res.status(200).json({
        message: `proveedor actualizado con éxito, id = ${proveedorId}`,
        proveedor: updatedObject
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el proveedor con id = " + req.params.idProveedor,
      error: error.message
    });
  }
};

exports.EliminarProveedor = async (req, res) => {
  try {
    let proveedorId = req.params.id;
    let proveedor = await Proveedor.findByPk(proveedorId);

    if (!proveedor) {
      res.status(404).json({
        message: `No existe el proveedor con id = ${proveedorId}`,
        error: "404"
      });
    } else {
      await proveedor.destroy();
      res.status(200).json({
        message: `proveedor eliminado con éxito, id = ${proveedorId}`,
        proveedor: proveedor
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el proveedor con id = " + req.params.idProveedor,
      error: error.message
    });
  }
};