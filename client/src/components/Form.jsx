import React from 'react'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import useForm from '../hooks/UseForm'


const FormS = styled.form`
    width: 22rem;
    padding: 25px 15px;
    background-color: #202020;
    border-radius: 5px;

    & h2 {
        color: #fff;
        margin-bottom: 10px;
    }

    & .warning {
        background-color: rgba(87, 87, 87, 0.151);
    }
`

const Input = styled.input`
    margin-bottom: 20px;
    width: 100%; 
    height: 2.2rem;
    border: 2px solid rgba(0, 134, 211, 0.4);
    border-radius: 5px;
    background-color: transparent;
    padding-left: 10px;
    outline: none;
    transition: 0.2s ease-in-out;
    color: white;

    ::placeholder {
        color: #eee;
    }
    :focus {
        border: 2px solid #0084ff;
    }

`

const Submit = styled.input`
    width: 100%; 
    height: 2.2rem;
    background-color: #0084ff;
    outline: none;
    border: none;
    border-radius: 5px;
    color: #fff;
    transition: .2s ease-in-out;
    cursor: pointer;
    font-weight: bold;
    :hover {
        background-color: #006cd1;
    }
    :disabled {
        background-color: #444444;
        cursor: not-allowed;
    }
`

const LabelContainer = styled.div`
    margin-bottom: 10px;
    & label {
        display: inline;
        color: white;
        font-size: 0.9rem;
    }
`

const Radio = styled.input.attrs({
    type: 'radio'
})`
margin-right: 10px;
:after {
        width: 100%;
        height: 100%;
        border-radius: 15px;
        top: -2px;
        left: -1px;
        position: relative;
        background-color: #727272;
        content: '';
        display: inline-block;
        visibility: visible;
        border: 2px solid white;
        transition: .3s ease-in-out;
    }
    :checked:after {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        top: -2px;
        left: -1px;
        position: relative;
        background-color: #006cd1;
        content: '';
        display: inline-block;
        visibility: visible;
        border: 2px solid white;
        transition: .3s ease-in-out;
}
`

const Form = ( {inputs, formTitle, products = null, submitFunction = null} ) => {
    const [ state, handleChange, reset ] = useForm();

    const handleSubmit = (e) => {
        e.preventDefault();
        let count = 0;
        for( const val in state){
            if(val) count++;
        }
        if(count >= inputs.length){
            toast.success('Bien hecho!');
            if(submitFunction) submitFunction();
            reset();
        } else {
            toast.error('Faltan campos');
        }
    }

    return (
        <FormS onSubmit={handleSubmit} autoComplete="off">
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
                       