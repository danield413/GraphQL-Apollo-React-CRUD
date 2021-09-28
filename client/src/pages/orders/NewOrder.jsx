import React from 'react'
import { Helmet } from 'react-helmet-async'
import Form from '../../components/Form'
import FormWrapper from '../../components/FormWrapper'
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

const NewOrder = () => {
    return (
        <>
            <Helmet>
                <title>Nueva Orden - ReactGraphQL</title>
            </Helmet>
            <FormWrapper isFlex={true}>
                <Form inputs={ inputs } formTitle="Nueva Orden" submitFunction={validateOrder}/>
            </FormWrapper>
        </>
    )
}

export default NewOrder
