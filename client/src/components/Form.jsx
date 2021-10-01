import React, { useRef } from 'react'
import { gql, useMutation } from '@apollo/client';
import toast from 'react-hot-toast'
import useForm from '../hooks/UseForm'
import { FormS, Input, LabelContainer, Radio, Submit } from '../styled/components/Form';

const NEW_PRODUCT = gql`
    mutation NuevoProductoMutation($input: NuevoProductoInput) {
    nuevoProducto(input: $input) {
        nombre
        precio
        disponible
        id
    }
}
`

const NEW_ORDER = gql`
    mutation NuevaOrdenMutation($input: NuevaOrdenInput) {
    nuevaOrden(input: $input) {
        id
        usuario
        mesa
        orden {
            cantidad
            nombre
            precio
            disponible
        }
        estado
        fecha
        total
    }
}
`

const Form = ( {inputs, formTitle, products, submitFunction = null} ) => {
    const [ state, handleChange, reset ] = useForm();
    const [ nuevoProducto ] = useMutation(NEW_PRODUCT);
    const [ nuevaOrden ] = useMutation(NEW_ORDER); 
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
                const orden = [
                    {
                        id: "123123123",
                        nombre: "Burrito",
                        cantidad: 1,
                        precio: 2500
                    },
                    {
                        id: "123123123AAAA",
                        nombre: "HotDog",
                        cantidad: 3,
                        precio: 5000
                    }
                ]
                const validation = products ? submitFunction( {...state, orden} ) : submitFunction( state ) 

                if( validation ) {
                    //si hay productos es es true es orden, false producto
                    if(products) {
                        const { mesa, nombreUsuario } = state;
                        const inputObj = {
                            usuario: nombreUsuario,
                            mesa: Number(mesa),
                            orden
                        }

                        try {
                            formRef.current.reset();
                            const resp = toast.promise(nuevaOrden({
                                variables: {
                                    input: inputObj
                                }
                            }), {
                                loading: 'Cargando...',
                                success: 'Nuevo orden creada!',
                                error: 'UPS... Hubo un error'
                            });
                            resp.then( ({ data }) => console.log(data.nuevaOrden) );
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
                            const resp = toast.promise(nuevoProducto({
                                variables: {
                                    input: inputObj
                                }
                            }), {
                                loading: 'Cargando...',
                                success: 'Nuevo producto añadido!',
                                error: 'UPS... Hubo un error'
                            });
                            resp.then( ({ data }) => console.log(data.nuevoProducto) );
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
        <FormS onSubmit={handleSubmit} autoComplete="off" ref={formRef}>
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
                       