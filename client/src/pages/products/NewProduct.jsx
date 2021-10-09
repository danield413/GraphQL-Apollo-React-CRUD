import { useQuery } from '@apollo/client';
import React from 'react'
import { Helmet } from 'react-helmet-async'
import Form from '../../components/Form';
import FormWrapper from '../../components/FormWrapper';
import Spinner from '../../components/Spinner';
import { GET_PRODUCTS } from '../../GraphQL/queries';
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

    const { loading, data } = useQuery(GET_PRODUCTS, {
        fetchPolicy:  "cache-first",
    });

    return (
        <>
            <Helmet>
                <title>Nuevo Producto - ReactGraphQL</title>
            </Helmet>
            <FormWrapper isFlex={true}>
                {
                    loading && <Spinner />
                }
                {
                    (data && data.obtenerProductos) && <Form inputs={ inputs } formTitle="Nuevo Producto" submitFunction={validateProduct} products={false}/>
                }
            </FormWrapper>
        </>
    )
}

export default NewProduct;
