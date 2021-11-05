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
    padding: 20px;
    background-color: #333333;
    border-radius: 16px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 20px;
    overflow: auto;

    @media screen and (max-width: 1000px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        margin-top: 20px;
        height: calc(90vh - 100px);
        width: 100%;
    }    
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
            <Container className="animate__animated animate__fadeIn">
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
