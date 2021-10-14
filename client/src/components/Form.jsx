import React, { useRef } from 'react'
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast'
import useForm from '../hooks/UseForm'
import { FormS, Input, LabelContainer, Radio, Submit } from '../styled/components/Form';
import useReducerContext from '../hooks/UseReducerContext';
import { NEW_ORDER, NEW_PRODUCT } from '../GraphQL/mutations';
import { GET_ORDERS, GET_PRODUCTS } from '../GraphQL/queries';
import client from '../config/apollo';


const Form = ( {inputs, formTitle, products, submitFunction = null} ) => {
    const [ state, handleChange, reset ] = useForm();
    const [ nuevoProducto ] = useMutation(NEW_PRODUCT, {
        update(cache,{ data: { nuevoProducto }} ) {
            const { obtenerProductos } = cache.readQuery({
                query: GET_PRODUCTS
            });

            cache.writeQuery({
                query: GET_PRODUCTS,
                data: {
                    obtenerProductos: [...obtenerProductos, nuevoProducto]
                }
            })
        }
    });
    
    const [ nuevaOrden ] = useMutation(NEW_ORDER, {
        update(cache,{ data: { nuevaOrden }} ) {
            const { obtenerOrdenes } = cache.readQuery({
                query: GET_ORDERS,
                variables: {
                    input: 'PENDIENTE'
                }
            });
            
            cache.writeQuery({
                query: GET_ORDERS,
                data: {
                    obtenerOrdenes: [...obtenerOrdenes, nuevaOrden]
                },
                variables: {
                    input: 'PENDIENTE'
                }
            })
        }
    });


    const { state: stateContext, dispatch } = useReducerContext();
    const formRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault();
        let count = 0;
        for( const val in state){
            if(val) count++;
        }
        if(count >= inputs.length){

            if(submitFunction) {
                //Orden de prueba
                const { order } = stateContext;
                const validation = products ? submitFunction( {...state, order} ) : submitFunction( state ) 

                if( validation ) {
                    //si hay productos es es true es orden, false producto
                    if(products) {
                        const { mesa, nombreUsuario } = state;
                        const inputObj = {
                            usuario: nombreUsuario,
                            mesa: Number(mesa),
                            orden: order
                        }

                        try {
                            formRef.current.reset();

                            const resp = client.readQuery({
                                query: GET_ORDERS,
                                variables: {
                                    input: 'PENDIENTE'
                                }
                            })
                            if(!resp) {
                                
                            }

                            await toast.promise(nuevaOrden({
                                variables: {
                                    input: inputObj
                                }
                            }), {
                                loading: 'Cargando...',
                                success: 'Nuevo orden creada!',
                                error: 'UPS... Hubo un error'
                            });
                            dispatch({type: 'ORDER_RESET'});
                        } catch (err) {
                            console.log(err)
                        }
                        reset();
                    } else {
                        const { nombre, precio, disponible } = state;
                        const inputObj = {
                            nombre, 
                            precio: Number(precio),
                             disponible: (disponible.toLowerCase() === 'true')
                        }
                        try{
                            formRef.current.reset();
                            await toast.promise(nuevoProducto({
                                variables: {
                                    input: inputObj
                                }
                            }), {
                                loading: 'Cargando...',
                                success: 'Nuevo producto añadido!',
                                error: 'UPS... Hubo un error'
                            });
                        } catch(err) {
                            console.log(err)
                        }
                        reset();
                    }
                }
            }
        } else {
            toast.error('Faltan campos');
        }
    }

    return (
        <FormS onSubmit={handleSubmit} autoComplete="off" ref={formRef} className="animate__animated animate__fadeIn">
            <h2>{formTitle}</h2>
            {inputs.map( ({ id, type, placeholder, name, radioValues }) => {
                if( type === 'radio' && radioValues.length > 1 ){
                    return radioValues.map( ({name, value, placeholder}) => {
                        return <LabelContainer key={id++}>
                            <label>
                                <Radio name={name} onChange={handleChange} value={value}/> {placeholder}
                            </label>
                        </LabelContainer>
                    } )
                } else {
                    return <Input key={id} type={type} name={name} placeholder={placeholder} min={0} onChange={handleChange}/>
                }
            })}

            <Submit type="submit" className="submit" value="Guardar"/>
        </FormS>
    )
}

export default Form
                       