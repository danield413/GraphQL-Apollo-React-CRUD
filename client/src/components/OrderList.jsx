import { useQuery } from '@apollo/client'
import React from 'react'
import styled from 'styled-components'
import { GrStatusGoodSmall } from 'react-icons/gr'
import Order from './Order'
import Spinner from './Spinner'
import { GET_ORDERS } from '../GraphQL/queries'

const List = styled.div`
    height: 70vh;
    background-color: #333333;
    border-radius: 16px;
    padding: 10px;
    .header {
        display: grid;
        grid-template-columns: 80% 20%;
        .title {
            h2 {
                color: #fff;
            }
        }  
        .status {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            svg {
                fill: ${(props) => {
                    if(props?.type === 'COMPLETADA') return '#00FFA2'
                    if(props?.type === 'PENDIENTE') return '#FFF000'
                    if(props?.type === 'CANCELADA') return '#ff006a'
                }}
            }
        }
    }
    .body {
        margin-top: 10px;
        height: 90%;
        overflow: auto;
        position: relative;
        .alert{
            color: white;
            position: absolute;
            top: 50%;  
            left: 50%; 
            transform: translate(-50%, -50%);
            font-size: 1.1rem;
            font-family: 'GT-L';
        }
    }
`

const OrderList = ( {type, queryInput} ) => {

    const { loading, data } = useQuery(GET_ORDERS, {
        variables: {
            input: queryInput
        },
        fetchPolicy: "cache-first"
    })

    return (
        <List type={queryInput} className="animate__animated animate__fadeIn">
            <div className="header">
                <div className="title">
                    <h2 className="no-selectable">{type}</h2>
                </div>
                <div className="status">
                    <GrStatusGoodSmall />
                </div>
            </div>
            <div className="body">
                {loading && <Spinner />}
                {data && data.obtenerOrdenes.map(({id, usuario, mesa,estado, total, fecha}) => (
                    <Order 
                        key={id}
                        id={id}
                        usuario={usuario}
                        mesa={mesa}
                        total={total}
                        fecha={fecha}
                    />
                ))}
                {(data && data?.obtenerOrdenes.length ===0) && <span className="alert no-selectable animate__animated animate__fadeIn animate_fadeOut">No hay órdenes</span> }
            </div>
        </List>
    )
}

export default OrderList
