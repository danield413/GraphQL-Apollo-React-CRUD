const mongoose = require("mongoose");

const PedidoSchema = mongoose.Schema({
    usuario: {
        type: String,
        required: true
    },
    mesa: {
        type: Number,
        required: true
    },
    orden: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        default: 'PENDIENTE'
    },
    fecha: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Pedido', PedidoSchema)  
