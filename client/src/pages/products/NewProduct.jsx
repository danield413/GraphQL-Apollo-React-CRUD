import React from 'react'
import { Helmet } from 'react-helmet-async'
import Form from '../../components/Form';
import FormWrapper from '../../components/FormWrapper';
import { validateProduct } from '../../utils/validateForm';

const inputs = [
    {
        id: 1,
        type: 'text',
        placeholder: 'Nombre del producto',
        name: 'nombre'
    },
    {
        id: 2,
        type: 'number',
        placeholder: 'precio',
        name: 'precio'
    },
    {
        id: 3,
        type: 'radio',
        radioValues: [{ name: 'disponible', value: true, placeholder: 'Disponible' }, { name: 'disponible', value: false, placeholder: 'No disponible'} ]
    }
]

const NewProduct = () => {
    return (
        <>
            <Helmet>
                <title>Nuevo Producto - ReactGraphQL</title>
            </Helmet>
            <FormWrapper isFlex={true}>
                <Form inputs={ inputs } formTitle="Nuevo Producto" submitFunction={validateProduct}/>
            </FormWrapper>
        </>
    )
}

export default NewProduct;
