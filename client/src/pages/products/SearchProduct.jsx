import React from 'react'
import { Helmet } from 'react-helmet-async'
import Search from '../../components/Search'

const SearchProduct = () => {
    return (
        <>
            <Helmet>
                <title>Buscar Producto - ReactGraphQL</title>
            </Helmet>
            <Search type="productos"/>
        </>
    )
}

export default SearchProduct
