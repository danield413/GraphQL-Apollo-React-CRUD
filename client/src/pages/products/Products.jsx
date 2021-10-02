import React from 'react'
import PageWrapper from '../../components/PageWrapper'
import { useQuery, gql } from '@apollo/client'
import Spinner from '../../components/Spinner'
import styled from 'styled-components'
import { GrStatusGoodSmall } from 'react-icons/gr'
import { AiFillEdit } from 'react-icons/ai'
import { FaExchangeAlt } from 'react-icons/fa'

export const GET_PRODUCTS = gql`
    query Query {
        obtenerProductos {
            id,
            nombre,
            precio,
            disponible
        }
    }
`

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

const Product = styled.div`
    width: 90%;
    height: 150px;
    padding: 20px;
    background-color: #1f1f1f;
    border-radius: 16px;
    margin: 0 auto;
    transition: .3s ease-in-out;
    position: relative;
    
    .header {
        display: grid;
        grid-template-columns: 90% 10%;
        h3 {
            color: #00afce;
            font-weight: bold;
        }
        .status {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            svg {
                fill: ${(props) => props.disponible ? '#00FFA2' : '#ff006a'};
            }
        }
    }

    h4 {
        color: #fff;
    }

    .actions {
        width: 9rem;
        height: 3.5rem;
        position: absolute;
        bottom: 20px;
        left: 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;

        div button {
            position: relative;
            height: 40px;
            width: 40px;
            border: none;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, .3);
            cursor: pointer;
            margin-right: 10px;
            transition: .3s ease-in-out;
            display: grid;
            place-content: center;
            svg {
                fill: white;
            }

            span {
                position: absolute;
                display: none;
                padding: 3px;
                background-color: #444444;
                border-radius: 10px;
                color: white;
                font-family: 'GT-L';
                width: 100px;
                top: calc(100% + 5px);
                transition: .2s ease-in-out;
            }
            
            &:hover span {
                display: block;
            }
            &:hover{
                background-color: #00d9ff75;
                filter: drop-shadow(0px 0px 4px #00d9ff);
            }
        }
    }

    &:hover {
        transform: scale(1.03);
    }
`

const Products = () => {

    const { loading, error, data } = useQuery(GET_PRODUCTS, {
        fetchPolicy:  "cache-first",
    });

    return (
        <PageWrapper title="Productos" count={data && data.obtenerProductos.length}>
            {
                loading && 
                <Spinner />
            }
            <Container>
                {
                    data && data.obtenerProductos.map( ({id, nombre, precio, disponible}) => (
                        <Product key={id} disponible={disponible}>
                            <div className="header">
                                <div><h3 className="no-selectable">{nombre}</h3></div>
                                <div className="status"><GrStatusGoodSmall /></div>
                            </div>
                            <h4 className="no-selectable">$ {precio} COP</h4>
                            <div className="actions">
                                <div><button><AiFillEdit size="18px"/> </button></div>
                                <div><button><FaExchangeAlt size="18px"/> </button></div> 
                            </div>
                        </Product>
                    ))
                }
            </Container>
        </PageWrapper>
    )
}

export default Products
