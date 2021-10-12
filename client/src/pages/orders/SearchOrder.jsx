import React from 'react'
import { Helmet } from 'react-helmet-async'
import Search from '../../components/Search'

const SearchOrder = () => {
    return (
        <>
            <Helmet>
                <title>Buscar Producto - ReactGraphQL</title>
            </Helmet>
            <Search type="órdenes" />
        </>
    )
}

export default SearchOrder
