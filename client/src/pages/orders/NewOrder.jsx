import { useQuery, gql } from '@apollo/client'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import Form from '../../components/Form'
import FormWrapper from '../../components/FormWrapper'
import Product from '../../components/Product'
import Spinner from '../../components/Spinner'
import { GET_PRODUCTS } from '../../GraphQL/queries'
import { validateOrder } from '../../utils/validateForm'

const inputs = [
    {
        id: 1,
        type: 'number',
        placeholder: 'Mesa',
        name: 'mesa'
    },
    {
        id: 2,
        type: 'text',
        placeholder: 'Nombre del usuario',
        name: 'nombreUsuario'
    }
]

const Container = styled.div`
    height: calc(100vh - 80px);
    width: 100%;
    padding: 20px;
    border-radius: 16px;
    padding: 0 10%;
    display: flex;
    align-items: center;
    position: relative;
    .list {
        height: 70%;
        width: 100%;
        overflow: auto;
        display: grid;
        grid-gap: 20px;
    }
`

const NewOrder = () => {

    const { loading, data } = useQuery(GET_PRODUCTS, {
        fetchPolicy:  "cache-first",
    });

    const filterData = () => {
        if(data) {
            const prods = data.obtenerProductos.filter( prod => prod.disponible !== false)
            return prods;
        }
    }

    const prods = filterData();

    return (
        <>
            <Helmet>
                <title>Nueva Orden - ReactGraphQL</title>
            </Helmet>
            <FormWrapper isGrid={true}>
                <Container>
                {
                    loading && 
                    <Spinner />
                }
                    <div className="list">
                        {prods && prods.map( ({id, nombre, precio, disponible}) => (
                            <Product 
                                key={id} 
                                id={id} 
                                nombre={nombre} 
                                precio={precio} 
                                disponible={disponible} 
                                newOrder={true}
                            />
                        ) )}
                    </div>
                </Container>
                <Container>
                    <Form inputs={ inputs } formTitle="Nueva Orden" submitFunction={validateOrder} products={true}/>
                </Container>
            </FormWrapper>
        </>
    )
}

export default NewOrder
