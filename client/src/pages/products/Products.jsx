import React from 'react'
import PageWrapper from '../../components/PageWrapper'
import { useQuery } from '@apollo/client'
import Spinner from '../../components/Spinner'
import styled from 'styled-components'
import Product from '../../components/Product'
import { GET_PRODUCTS } from '../../GraphQL/queries.js'

const Container = styled.div`
    margin-top: 10px;
    height: calc(100vh - 80px - 25%);
    padding: 20px 0;
    background-color: #333333;
    border-radius: 16px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 20px;
    overflow: auto;
`

const Products = () => {

    const { loading, data } = useQuery(GET_PRODUCTS, {
        fetchPolicy:  "cache-first",
    });

    return (
        <PageWrapper title="Productos" count={data && data.obtenerProductos.length}>
            {
                loading && 
                <Spinner />
            }
            <Container>
                { data && data.obtenerProductos.map( ({id, nombre, precio, disponible}) => (
                    <Product 
                        key={id} 
                        id={id} 
                        nombre={nombre} 
                        precio={precio} 
                        disponible={disponible} 
                    />
                ))}
            </Container>
        </PageWrapper>
    )
}

export default Products
