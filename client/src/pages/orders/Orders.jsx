import { Helmet } from "react-helmet-async"
import PageWrapper from "../../components/PageWrapper"
import OrderList from "../../components/OrderList"
import styled from "styled-components"

const OrdersContainer = styled.div`
    width: 100%;
    height: calc(100vh - 80px - 25%);
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 15px;
`

const Orders = () => {

    return (
        <>
            <Helmet>
                <title>Órdenes - ReactGraphQL</title>
            </Helmet>
            <PageWrapper title="Órdenes">
                <OrdersContainer>
                    <OrderList type="Completadas" queryInput="COMPLETADA" />
                    <OrderList type="Pendientes" queryInput="PENDIENTE" />
                    <OrderList type="Canceladas" queryInput="CANCELADA" />
                </OrdersContainer>
            </PageWrapper>
        </>
    )
}

export default Orders
