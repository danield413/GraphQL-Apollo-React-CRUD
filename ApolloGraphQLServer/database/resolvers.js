const calcularTotal = require("../helpers/calcularTotal");
const Pedido = require("../models/Pedido");
const Producto = require("../models/Producto");

const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];
  

const resolvers = {
    Query: {
        obtenerProductos: async () => {
            try {
                const productos = await Producto.find();
                return productos;
            } catch (error) {
                console.log(error);
            }
        },
        obtenerProducto: async (_, {input}) => {
            try {
                const producto = await Producto.findById(input);
                return producto;
            } catch (error) {
                console.log(error);
            }
        },
        obtenerOrdenes : async (_, {input}) => {
            try {

                const estadoOrden = input;

                const ordenesFiltradas = await Pedido.find({ estado: estadoOrden });
                return ordenesFiltradas;
            } catch (error) {
                console.log(error);
            }
        },
        obtenerOrden : async (_, {input}) => {
            try {
                const orden = await Pedido.findById(input)   ;
                return orden;             
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        nuevoProducto: async (_, {input}) => {
            try {
                const nuevoProducto = new Producto(input);
                await nuevoProducto.save();
                return nuevoProducto;
            } catch (error) {
                console.log(error);
            }
        },
        cambiarProductoDisponible: async(_, {input}) => {
            try {
                
                const { id } = input;

                let producto = await Producto.findById(id);
                producto.disponible = disponible;
                
                const actualizado = await Producto.findByIdAndUpdate(id, producto, { new: true });
                
                return actualizado;
                
            } catch (error) {
                console.log(error);
            }
        },
        actualizarDatosProducto: async(_, {input}) => {
            try {
                
                const { id } = input;

                let producto = await Producto.findById(id);
                if(input.precio) producto.precio = input.precio; 
                if(input.nombre) producto.nombre = input.nombre;
                if(!input.precio && !input.nombre) throw new Error("Debes mandar algo para actualizar (nombre o precio) del producto");

                const actualizado = await Producto.findByIdAndUpdate(id, producto, { new: true });
                return actualizado

            } catch (error) {
                console.log(error);
            }
        },
        nuevaOrden : async (_, {input}) => {
            console.log(input)
            try {
                let nuevaOrden = input;

                const total = calcularTotal(nuevaOrden.orden);
                nuevaOrden.total = total;
                
                const orden = await new Pedido(nuevaOrden);
                await orden.save();

                return orden;

            } catch (error) {
                console.log(error);
            }
        },
        cambiarEstadoOrden : async (_, {input}) => {
            try {
                const { id, estado:nuevoestado } = input;

                let orden = await Pedido.findById(id);
                orden.estado = nuevoestado;

                const ordenActualizada = await Pedido.findByIdAndUpdate(id, orden, { new: true })

                return ordenActualizada;

            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = resolvers;