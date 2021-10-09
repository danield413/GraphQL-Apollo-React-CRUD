import gql from "graphql-tag";

const GET_PRODUCTS = gql`
    query Query {
        obtenerProductos {
            id,
            nombre,
            precio,
            disponible
        }
    }
`

const GET_ORDERS = gql`
    query Query($input: estadoOrden) {
        obtenerOrdenes(input: $input) {
            id
            usuario
            mesa
            fecha
            total
        }
    }
`

// const GET_PENDING_ORDERS =  gql`
//     query Query($input: "PENDIENTE") {
//         obtenerOrdenes(input: $input) {
//             id
//             usuario
//             mesa
//             fecha
//             total
//         }
//     }
// `

export {
    GET_ORDERS,
    GET_PRODUCTS
}