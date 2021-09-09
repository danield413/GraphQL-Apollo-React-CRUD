const { gql } = require('apollo-server');

const typeDefs = gql`

    type Orden {
        id: ID
        usuario: String
        mesa: Int
        orden: [ProductoPedido]
        estado: estadoOrden
        fecha: String
        total: Float
    }

    type ProductoPedido {
        nombre: String
        precio: Float
        disponible: Boolean
        cantidad: Int
    }

    type Producto {
        id: ID
        nombre: String
        precio: Float
        disponible: Boolean
    }

    type ConfirmacionProductoNoDisponibleOActualizado {
        id: ID
        nombre: String
        mensaje: String
    }

    type ConfirmacionEstadoOrdenActualizado {
        id: ID
        mensaje: String
    }

    enum estadoOrden {
        PENDIENTE
        COMPLETADA
        CANCELADA
    }

    input NuevoProductoInput {
        nombre: String!
        precio: Float!
        disponible: Boolean!
    }

    input ProductoInput {
        id: ID
        nombre: String
        cantidad: Int
        precio: Float
    }

    input NuevaOrdenInput {
        orden: [ProductoInput]!
        mesa: Int!
        usuario: String!
    }

    input CambiarEstadoInput {
        id: ID
        estado: estadoOrden
    }

    input CambiarEstadoDisponible {
        id: ID
        disponible: Boolean
    }

    input ActualizarDatosProductoInput {
        id: ID!
        nombre: String
        precio: Float
    }

    type Query {
        # traer productos
        obtenerProductos : [Producto]
        obtenerProducto(input: ID) : Producto

        # traer ordenes
        obtenerOrdenes(input: estadoOrden) : [Orden]
        obtenerOrden(input: ID) : Orden
    }

    type Mutation {
        # productoS
        nuevoProducto(input: NuevoProductoInput) : Producto
        cambiarProductoDisponible(input: CambiarEstadoDisponible) : Producto 
        actualizarDatosProducto(input: ActualizarDatosProductoInput) : Producto
        
        # ordenes
        nuevaOrden(input: NuevaOrdenInput) : Orden
        cambiarEstadoOrden(input: CambiarEstadoInput) : Orden
    }

`;

module.exports = typeDefs;