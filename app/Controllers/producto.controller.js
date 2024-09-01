const db = require('../Config/db.config.js');
const Producto = db.Producto;

exports.CrearProducto = (req, res) => {
  let producto = {};

  try {
    producto.descripcion = req.body.descripcion;
    producto.stock = req.body.stock;
    producto.stockMinimo = req.body.stockMinimo;
    producto.precioUnitario = req.body.precioUnitario;
    producto.ProveedorId = req.body.ProveedorId;

    Producto.create(producto).then((result) => {
      res.status(200).json({
        message: `Registro creado exitosamente con id = ${result.idProducto}`,
        producto: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al momento de crear!",
      error: error.message,
    });
  }
};

exports.retrieveAllProducto = (req, res) => {
  Producto.findAll()
    .then(productoInfo => {
      res.status(200).json({
        message: "Productos recuperados exitosamente!",
        producto: productoInfo
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error al obtener Productos!",
        error: error.message
      });
    });
};

exports.ObtenerProductoId = (req, res) => {
  let productoId = req.params.idProducto;
  Producto.findByPk(productoId)
    .then(producto => {
      if (producto) {
        res.status(200).json({
          message: `producto obtenido con id = ${productoId}`,
          producto: producto
        });
      } else {
        res.status(404).json({
          message: `No se encontró el producto con id = ${productoId}`
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "No fue posible obtener el producto",
        error: error.message
      });
    });
};

exports.ActualizarProducto = async (req, res) => {
  try {
    let productoId = req.params.idProducto;
    let producto = await Producto.findByPk(productoId);

    if (!producto) {
      res.status(404).json({
        message: `No fue posible actualizar el producto con id = ${productoId}`,
        producto: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        descripcion: req.body.descripcion,
        stock: req.body.stock,
        stockMinimo: req.body.stockMinimo,
        precioUnitario: req.body.precioUnitario,
        ProveedorId: req.body.ProveedorId
      };

      let result = await Producto.update(updatedObject, { returning: true, where: { id: productoId } });

      if (!result) {
        res.status(500).json({
          message: "Error -> No fue posible actualizar el Producto con id = " + req.params.idProducto,
          error: "Can NOT Updated"
        });
      }

      res.status(200).json({
        message: `Producto actualizado con éxito, id = ${productoId}`,
        producto: updatedObject
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el Producto con id = " + req.params.idProducto,
      error: error.message
    });
  }
};

exports.EliminarProducto = async (req, res) => {
  try {
    let productoId = req.params.id;
    let producto = await Producto.findByPk(productoId);

    if (!producto) {
      res.status(404).json({
        message: `No existe el producto con id = ${productoId}`,
        error: "404"
      });
    } else {
      await producto.destroy();
      res.status(200).json({
        message: `producto eliminado con éxito, id = ${productoId}`,
        producto: producto
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el producto con id = " + req.params.idProducto,
      error: error.message
    });
  }
};