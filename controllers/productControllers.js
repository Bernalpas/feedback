const Servicio = require('../servicios/productServices')

const traerProductos = async (req, res) => {

    const todosLosProductos =  await Servicio.buscarProductos();
    res.status(200).json(todosLosProductos)
}

const dameUnProducto = (req, res) => {
    const id = req.params.id;
    console.log(id);
    res.status(200).json({
        id: req.params.id
    })
}
    
const errorProductos = (req, res) => {
    console.log(req);
    res.status(404).send(`<h1>Error productos</h1>`)
}
    
const crearProductos = (req, res) => {

    const { nombre, precio, stock } = req.body;
    console.log(`${nombre} - ${precio} - ${stock}`);

    Servicio.guardarProducto(req.body);

    res.status(200).send(`<h1>Creamos los productos ${nombre} - ${precio} - ${stock}</h1>`)
}
    
const modificarProductos = (req, res) => {
    const id = req.params.id;
    console.log(id);
    res.status(200).json({
        id: req.params.id,
        mensaje: 'Modificamos los productos'
    })
}
    
const eliminarProductos = (req, res) => {
    const id = req.params.id;
    console.log(id);
    res.status(200).json({
        id: req.params.id,
        mensaje: 'Eliminamos los productos'
    })
}

module.exports = {
    traerProductos,
    dameUnProducto,
    errorProductos,
    crearProductos,
    modificarProductos,
    eliminarProductos
}


