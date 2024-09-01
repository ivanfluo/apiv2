const db = require('../Config/db.config.js');
const Factura = db.Factura;

exports.CrearFactura = (req, res) => {
  let factura = {};

  try {
    factura.noFactura = req.body.noFactura;
    factura.serie = req.body.serie;
    factura.facturaId = req.body.facturaId;
    factura.EmpleadoId = req.body.EmpleadoId;
    factura.fechaFactura = req.body.fechaFactura;

    Factura.create(factura).then((result) => {
      res.status(200).json({
        message: `Registro creado exitosamente con id = ${result.idFactura}`,
        factura: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al momento de crear!",
      error: error.message,
    });
  }
};

exports.retrieveAllFactura = (req, res) => {
  Factura.findAll()
    .then(facturaInfo => {
      res.status(200).json({
        message: "Facturas recuperadas exitosamente!",
        Factura: facturaInfo
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error al obtener las Facturas!",
        error: error.message
      });
    });
};

exports.ObtenerFacturaId = (req, res) => {
  let facturaId = req.params.idFactura;
  Factura.findByPk(facturaId)
    .then(factura => {
      if (factura) {
        res.status(200).json({
          message: `factura obtenido con id = ${facturaId}`,
          factura: factura
        });
      } else {
        res.status(404).json({
          message: `No se encontró el factura con id = ${facturaId}`
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

exports.ActualizarFactura = async (req, res) => {
  try {
    let facturaId = req.params.idFactura;
    let factura = await Factura.findByPk(facturaId);

    if (!factura) {
      res.status(404).json({
        message: `No fue posible actualizar el factura con id = ${facturaId}`,
        factura: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        noFactura: req.body.noFactura,
        serie: req.body.serie,
        facturaId: req.body.facturaId,
        EmpleadoId: req.body.EmpleadoId,
        fechaFactura: req.body.fechaFactura
      };

      let result = await Factura.update(updatedObject, { returning: true, where: { id: facturaId } });

      if (!result) {
        res.status(500).json({
          message: "Error -> No fue posible actualizar la Factura con id = " + req.params.idFactura,
          error: "Can NOT Updated"
        });
      }

      res.status(200).json({
        message: `Factura actualizado con éxito, id = ${facturaId}`,
        factura: updatedObject
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar la Factura con id = " + req.params.idFactura,
      error: error.message
    });
  }
};

exports.EliminarFactura = async (req, res) => {
  try {
    let facturaId = req.params.id;
    let factura = await Factura.findByPk(facturaId);

    if (!factura) {
      res.status(404).json({
        message: `No existe el factura con id = ${facturaId}`,
        error: "404"
      });
    } else {
      await factura.destroy();
      res.status(200).json({
        message: `factura eliminado con éxito, id = ${facturaId}`,
        factura: factura
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el factura con id = " + req.params.idFactura,
      error: error.message
    });
  }
};