
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

//configuramos con Schema nuestra collección de db
const productSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: { 
        type: Number, 
        required: true,
    },
    stock: {
        type: Number, 
        required: true
    },
    timestamp: {
        type: Date,
        default: new Date(),
    }
});

//exportamos la configuración con el nombre de la colección
module.exports = mongoose.model('Producto', productSchema);