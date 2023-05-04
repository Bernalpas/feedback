
const express = require('express');
const router = express.Router();
const {
    traerProductos,
    dameUnProducto,
    errorProductos,
    crearProductos,
    modificarProductos,
    eliminarProductos
} = require('../controllers/productControllers');


// Responde a la ruta /productos

router.get('/', traerProductos);
router.get('/:id', dameUnProducto);
router.get('/error', errorProductos);
router.post('/', crearProductos);
router.post('/update/:id', modificarProductos);
router.post('/delete/:id', eliminarProductos);


module.exports = router;