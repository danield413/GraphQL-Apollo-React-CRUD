const mongoose = require("mongoose");

const ProductoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    disponible: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Producto', ProductoSchema)  