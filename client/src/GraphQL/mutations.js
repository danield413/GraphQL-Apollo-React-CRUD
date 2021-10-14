import {gql} from "@apollo/client"

const NEW_PRODUCT = gql`
    mutation NuevoProductoMutation($input: NuevoProductoInput) {
    nuevoProducto(input: $input) {
        nombre
        precio
        disponible
        id
    }
}
`

const NEW_ORDER = gql`
    mutation NuevaOrdenMutation($input: NuevaOrdenInput) {
    nuevaOrden(input: $input) {
        id
        usuario
        mesa
        orden {
            cantidad
            nombre
            precio
            disponible
        }
        estado
        fecha
        total
    }
}
`

const CHANGE_AVAILABLE = gql`
    mutation CambiarProductoDisponibleMutation($input: CambiarEstadoDisponible) {
    cambiarProductoDisponible(input: $input) {
        id
        nombre
        precio
        disponible
    }
}
`

export {
    NEW_ORDER,
    NEW_PRODUCT,
    CHANGE_AVAILABLE
}