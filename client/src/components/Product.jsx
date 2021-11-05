import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { AiFillCaretLeft, AiFillCaretRight, AiFillEdit } from "react-icons/ai";
import { FaExchangeAlt } from "react-icons/fa";
import { GrStatusGoodSmall } from "react-icons/gr";
import { HiOutlinePlus } from 'react-icons/hi'
import toast from 'react-hot-toast'
import styled from "styled-components";
import useReducerContext from "../hooks/UseReducerContext";
import { formatter } from "../utils/cop";
import { CHANGE_AVAILABLE } from "../GraphQL/mutations";
import ModalUpdate from "./ModalUpdate";

const ProductC = styled.div`
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
        .name {
            font-size: 1.1rem;
            width: 90%;
            height: 20px;
            color: #00afce;
            font-weight: bold;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
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

   span {
        color: #fff;
        font-family: 'GT-M';
    }

    .actions {
        height: 3.5rem;
        position: absolute;
        bottom: 20px;
        left: 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;

        .counter {
            background-color: rgba(255, 255, 255, .3);
            height: 40px;
            width: 40px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
        }

        div button {
            position: relative;
            height: 40px;
            width: 40px;
            border: none;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, .3);
            cursor: pointer;
            margin-right: 10px;
            transition: .2s ease-in-out;
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
            &:focus {
                outline: 3px solid #00d9ff75;
            }
        }
    }

    &:hover {
        transform: scale(1.03);
    }

    @media screen and (max-width: 768px){
        height:  150px;
        margin: 0;
        width: 100%;
        .header {
            margin-bottom: 5px;
            .name {
                font-size: 1rem;
            }
        }
        span {
            font-size: .9rem;
        }
    }
`

const Product = ({id, nombre, precio, disponible, newOrder = false, cantidad = null}) => {

    const [counter, setCounter] = useState(1);
    const [isOpen, setIsOpen] = useState( false );
    const { dispatch } = useReducerContext();
    const [ cambiarEstadoDisponible ] = useMutation(CHANGE_AVAILABLE, {
        variables: {
            input: {
                id,
                disponible: !disponible
            }
        },
        
    });

    const add = () => {
        setCounter(counter + 1)
    }

    const substract = () => {
        if(counter > 1){
            setCounter(counter - 1)
        }
    }

    const payload = {
        id,
        nombre,
        cantidad: counter,
        precio
    }

    const handleAdd = () => {
        dispatch({
            type: 'ORDER_ADD_PRODUCT',
            payload
        });
        toast.success('Añadido a la orden actual');
    }

    const handleToggle = async () => {
        try {
            await toast.promise(cambiarEstadoDisponible(), {
                loading: 'Cambiando disponibilidad',
                success: `${nombre} ahora ${disponible ? 'no está disponible' : 'está disponible'}`,
                error: 'UPS... Hubo un error'
            })
        } catch (error) {
            console.log(error);
        }
    }

    const toggleUpdate = () => {
        setIsOpen(!isOpen);
    }
 
    return (
        <>
            <ProductC disponible={disponible} className="animate__animated animate__fadeIn">
                <div className="header">
                    <div className="name no-selectable">
                        {nombre}
                    </div>
                    <div className="status">
                        <GrStatusGoodSmall />
                    </div>
                </div>
                <span className="no-selectable">{formatter.format(precio)} COP</span>
                <div className="actions">
                    {
                        newOrder 
                        && <>
                            <div>
                                <button onClick={handleAdd}>
                                    <HiOutlinePlus color="#fff" size="18px"/>
                                </button>
                            </div>
                            <div>
                                <button onClick={substract}>
                                    <AiFillCaretLeft size="18px"/>
                                </button>
                            </div>
                            <div className="counter">
                                <span className="no-selectable">{counter}</span>
                            </div>
                            <div>
                                <button onClick={add}>
                                    <AiFillCaretRight size="18px"/>
                                </button>
                            </div>
                        </> 
                    }
                    { (!newOrder && !cantidad) && 
                        <>
                            <div>
                                <button onClick={toggleUpdate}>
                                    <AiFillEdit size="18px"/>
                                </button>
                            </div>
                            <div>
                                <button onClick={handleToggle}>
                                    <FaExchangeAlt size="18px" />
                                </button>
                            </div>
                        </>
                    }
                    { cantidad &&
                        <div className="counter">
                            <span className="no-selectable">{cantidad}</span>
                        </div>
                    }
                </div>
            </ProductC>
            {
                (!newOrder && !cantidad) && <ModalUpdate 
                                                isOpen={isOpen} 
                                                setIsOpen={setIsOpen}
                                                id={id}
                                                nombre={nombre}
                                                precio={precio}
                                            />
            }
        </>
    );
};

export default React.memo(Product);
