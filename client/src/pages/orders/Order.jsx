import React from 'react'
import { useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { GET_ORDER } from '../../GraphQL/queries';
import styled from 'styled-components';
import PageWrapper from '../../components/PageWrapper';
import Spinner from '../../components/Spinner';
import parseDate from '../../utils/parseDate';
import { formatter } from '../../utils/cop';
import Product from '../../components/Product';
import { GrStatusGoodSmall } from "react-icons/gr";

const Grid = styled.div`
    width: 100%;
    height: calc(100vh - 80px - 25%);
    background-color: #333333;
    position: relative;
    margin-top: 20px;
    border-radius: 16px;
    display: grid;
    grid-template-columns: 40% 60%;
    padding: 20px;

    .info {
        position: relative;
        .usuario {
            margin-bottom: 20px;
            h3 {
                display: flex;
                align-items: center;
                color: #fff;
                font-family: 'GT-L';
                font-size: 1.7rem;
            }
        }
        .info-head {
            height: 5rem;
            display: flex;
            .info-mesa {
                padding: 10px;
                border-radius: 16px;
                width: 25%;
                height: 100%;
                background-color: #1F1F1F;
                display: grid;
                grid-template-rows: 30% 70%;
                .info-head-title {
                    color: white;
                    text-align: center;
                }
                .info-head-number {
                    display: flex;
                    justify-content: center;
                    color: white;
                    font-size: 2.5rem;
                }
            }
        }
        .estado {
            margin: 20px 0;
            height: 3rem;
            width: 12rem;
            background-color: #1F1F1F;
            border-radius: 16px;
            display: grid;
            grid-template-columns: 20% 80%;
            div {
                display: flex;
                justify-content: center;
                align-items: center;
                span {
                    font-family: 'GT-L';
                    color: white;
                }
                svg {
                    fill: ${(props) => {
                        if(props?.type === 'COMPLETADA') return '#00FFA2'
                        if(props?.type === 'PENDIENTE') return '#FFF000'
                        if(props?.type === 'CANCELADA') return '#ff006a'
                    }}
                }
            }
        }
        .fecha {
            margin: 20px 0;
            height: 3rem;
            width: 20rem;
            background-color: #1F1F1F;
            border-radius: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
                color: white;
                font-family: 'GT-L';
            }
        }
        #total {
            position: absolute;
            bottom: 0;
            color: white;
            font-size: 2rem;
        }
    }
    .order {
        padding: 10px 60px;
        overflow-y: auto;
        display: grid;
        grid-row-gap: 10px;
    }
`

const Order = () => {

    const params = useParams();
    const { id } = params;

    const { data, loading } = useQuery(GET_ORDER, {
        variables: {
            input: id
        }
    })

    return (
        <>
            <Helmet>
                <title>Orden - </title>
            </Helmet>
            <PageWrapper title="Vista general">
                <Grid type={(data) && data.obtenerOrden.estado}>
                    {loading && <Spinner />}
                    <div className="info">
                        { data &&
                            <>
                                <div className="usuario">
                                    <h3>{data.obtenerOrden.usuario}</h3>
                                </div>
                                <div className="info-head">
                                    <div className="info-mesa">
                                        <div className="no-selectable info-head-title">Mesa</div>
                                        <div className="no-selectable info-head-number">{data.obtenerOrden.mesa}</div>
                                    </div>
                                </div>
                                <div className="estado">
                                    <div>
                                        <GrStatusGoodSmall />
                                    </div>
                                    <div>
                                        <span className="no-selectable">Orden {data.obtenerOrden.estado.toLowerCase()} </span>
                                    </div>
                                </div>
                                <div className="fecha">
                                    <span className="no-selectable">Fecha: {parseDate(data.obtenerOrden.fecha)}</span>
                                </div>
                                <span id="total" className="no-selectable">Total: {formatter.format(data.obtenerOrden.total)} COP</span>
                            </>
                        }
                    </div>
                    <div className="order">
                        {data && data.obtenerOrden.orden.map( ({nombre, precio, disponible, cantidad}, index) => {
                            return <Product
                                        key={index}
                                        nombre={nombre}
                                        precio={precio}
                                        disponible={disponible}
                                        cantidad={cantidad}
                                    />
                        } )}
                    </div>
                </Grid>                    
            </PageWrapper>
        </>
    )
}

export default Order