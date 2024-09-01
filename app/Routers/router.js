let express = require("express");
let router = express.Router();

////Departamento
const departamento = require("../Controllers/departamento.controller.js");
router.post("/departamento/crearDepartamento", departamento.CrearDepartamento);
router.get("/departamento/obtenerTodos", departamento.retrieveAllDepartamento);
router.get("/departamento/obtenerporid/:idDepartamento", departamento.ObtenerDepartamentoId);
router.put("/departamento/actualizarDepartamento/:idDepartamento", departamento.ActualizarDepartamento);
router.delete("/departamento/eliminarDepartamento/:idDepartamento", departamento.EliminarDepartamento);

////Empleado
const empleado = require("../Controllers/empleado.controller.js");
router.post("/empleado/crearEmpleado", empleado.CrearEmpleado);
router.get("/empleado/obtenerTodos", empleado.retrieveAllEmpleado);
router.get("/empleado/obtenerEmpleado/:idEmpleado", empleado.ObtenerEmpleadoId);
router.put("/empleado/actualizarEmpleado/:idEmpleado", empleado.ActualizarEmpleado);
router.delete("/empleado/eliminarEmpleado/:idEmpleado", empleado.EliminarEmpleado);

////Cliente
const cliente = require("../Controllers/cliente.controller.js");
router.post("/cliente/crearCliente", cliente.CrearCliente);
router.get("/cliente/obtenerTodos", cliente.retrieveAllCliente);
router.get("/cliente/obtenerCliente/:idProducto", cliente.ObtenerClienteId);
router.put("/cliente/actualizarCliente/:idCliente", cliente.ActualizarCliente);
router.delete("/cliente/eliminarCliente/:idCliente", cliente.EliminarCliente);

////Producto
const producto = require("../Controllers/producto.controller.js");
router.post("/producto/crearProducto", producto.CrearProducto);
router.get("/producto/obtenerTodos", producto.retrieveAllProducto);
router.get("/producto/obtenerproducto/:idProducto", producto.ObtenerProductoId);
router.put("/producto/actualizarproducto/:idProducto", producto.ActualizarProducto);
router.delete("/producto/eliminarproducto/:idProducto", producto.EliminarProducto);

////Proveedor
const proveedor = require("../Controllers/proveedor.controller.js");
router.post("/proveedor/crearProveedor", proveedor.CrearProveedor);
router.get("/proveedor/obtenerTodos", proveedor.retrieveAllProveedor);
router.get("/proveedor/obtenerproveedor/:idProveedor", proveedor.ObtenerProveedorId);
router.put("/proveedor/actualizarproveedor/:idProveedor", proveedor.ActualizarProveedor);
router.delete("/proveedor/eliminarproveedor/:idProveedor", proveedor.EliminarProveedor);

////Factura
const factura = require("../Controllers/factura.controller.js");
router.post("/factura/crearFactura", factura.CrearFactura);
router.get("/factura/obtenerTodos", factura.retrieveAllFactura);
router.get("/factura/obtenerFactura/:idFactura", factura.ObtenerFacturaId);
router.put("/factura/actualizarFactura/:idFactura", factura.ActualizarFactura);
router.delete("/factura/eliminarFactura/:idFactura", factura.EliminarFactura);

////FacturaDetalle
const facturaDetalle = require("../Controllers/factura_detalle.controller.js");
router.post("/facturaDetalle/crearFacturaDetalle", facturaDetalle.CrearFacturaDetalle);
router.get("/facturaDetalle/obtenerTodos", facturaDetalle.retrieveAllFacturaDetalle);
router.get("/facturaDetalle/obtenerFacturaDetalle/:idFacturaDetalle", facturaDetalle.ObtenerFacturaDetalleId);
router.put("/facturaDetalle/actualizarFacturaDetalle/:idFacturaDetalle", facturaDetalle.ActualizarFacturaDetalle);
router.delete("/facturaDetalle/eliminarFacturaDetalle/:idFacturaDetalle", facturaDetalle.EliminarFacturaDetalle);
module.exports = router;
