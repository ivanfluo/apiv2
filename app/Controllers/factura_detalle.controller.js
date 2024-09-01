const db = require('../Config/db.config.js');
const FacturaDetalle = db.FacturaDetalle;

exports.CrearFacturaDetalle = (req, res) => {
  let facturaDetalle = {};

  try {
    facturaDetalle.facturaDetalleId = req.body.facturaDetalleId;
    facturaDetalle.idLinea = req.body.idLinea;
    facturaDetalle.ProductoId = req.body.ProductoId;
    facturaDetalle.cantidad = req.body.cantidad;

    FacturaDetalle.create(facturaDetalle).then((result) => {
      res.status(200).json({
        message: `Registro creado exitosamente con id = ${result.idFacturaDetalleDetalle}`,
        facturaDetalle: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al momento de crear!",
      error: error.message,
    });
  }
};

exports.retrieveAllFacturaDetalle = (req, res) => {
  FacturaDetalle.findAll()
    .then(facturaDetalleInfo => {
      res.status(200).json({
        message: "Facturas Detalle recuperadas exitosamente!",
        Factura: facturaDetalleInfo
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error al obtener las FacturasDetalle!",
        error: error.message
      });
    });
};

exports.ObtenerFacturaDetalleId = (req, res) => {
  let facturaDetalleId = req.params.idFacturaDetalle;
  FacturaDetalle.findByPk(facturaDetalleId)
    .then(facturaDetalle => {
      if (facturaDetalle) {
        res.status(200).json({
          message: `factura obtenido con id = ${facturaDetalleId}`,
          facturaDetalle: facturaDetalle
        });
      } else {
        res.status(404).json({
          message: `No se encontró el factura con id = ${facturaDetalleId}`
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "No fue posible obtener el factura",
        error: error.message
      });
    });
};

exports.ActualizarFacturaDetalle = async (req, res) => {
  try {
    let facturaDetalleId = req.params.idFacturaDetalle;
    let facturaDetalle = await Factura.findByPk(facturaDetalleId);

    if (!facturaDetalle) {
      res.status(404).json({
        message: `No fue posible actualizar el factura con id = ${facturaDetalleId}`,
        facturaDetalle: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        facturaDetalleId: req.body.facturaDetalleId,
        idLinea: req.body.idLinea,
        ProductoId: req.body.ProductoId,
        cantidad: req.body.cantidad
      };

      let result = await FacturaDetalle.update(updatedObject, { returning: true, where: { id: facturaDetalleId } });

      if (!result) {
        res.status(500).json({
          message: "Error -> No fue posible actualizar la Factura con id = " + req.params.idFacturaDetalle,
          error: "Can NOT Updated"
        });
      }

      res.status(200).json({
        message: `Factura actualizado con éxito, id = ${facturaDetalleId}`,
        facturaDetalle: updatedObject
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar la Factura con id = " + req.params.idFacturaDetalle,
      error: error.message
    });
  }
};

exports.EliminarFacturaDetalle = async (req, res) => {
  try {
    let facturaDetalleId = req.params.id;
    let factura = await Factura.findByPk(facturaDetalleId);

    if (!factura) {
      res.status(404).json({
        message: `No existe el factura con id = ${facturaDetalleId}`,
        error: "404"
      });
    } else {
      await factura.destroy();
      res.status(200).json({
        message: `factura eliminado con éxito, id = ${facturaDetalleId}`,
        factura: factura
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el factura con id = " + req.params.idFacturaDetalle,
      error: error.message
    });
  }
};