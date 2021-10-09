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

export {
    NEW_ORDER,
    NEW_PRODUCT
}