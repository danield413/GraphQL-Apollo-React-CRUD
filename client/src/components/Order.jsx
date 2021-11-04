import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { formatter } from '../utils/cop'
import { AiFillEye } from 'react-icons/ai'
import parseDate from '../utils/parseDate'

const OrderC = styled.div`
    height: 8rem;
    margin-bottom: 20px;
    background-color: #1F1F1F;
    border-radius: 16px;
    padding: 20px;
    position: relative;
    .header {
        display: grid;
        grid-template-columns: 60% 40%;
        h4 { 
            font-weight: bold;
        }
        .usuario {
            h4 {
                color: #00afce;
            }
        }
        .mesa {
            display: flex;
            justify-content: flex-end;
            h4 {
                color: #fff;
                font-family: 'GT-L';
            }
        }
    }
    .body {
        span {
            font-family: 'GT-M';
            font-size: 1rem;
            color: #fff;
            display: block;
            &#fecha {
                font-size: .9rem;
                color: #c2c2c2;
            }
        }
        
    }
    .footer {
        position: absolute;
        bottom: 20px;
        right: 20px;
        
        a {
            position: relative;
            height: 40px;
            width: 40px;
            border: none;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, .3);
            cursor: pointer;
            transition: .2s ease-in-out;
            display: grid;
            place-content: center;
            svg {
                fill: white;
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
`

const Order = ( {id, usuario, mesa, total, fecha} ) => {

    
    return (
        <OrderC>
            <div className="header">
                <div className="usuario">
                    <h4 className="no-selectable">{usuario}</h4>
                </div>
                <div className="mesa">
                    <h4 className="no-selectable">Mesa {mesa}</h4>
                </div>
            </div>
            <div className="body">
                <span className="no-selectable">Total {formatter.format(total)} COP</span>
                <span id="fecha" className="no-selectable">{parseDate(fecha)}</span>
            </div>
            <div className="footer">
                <Link to={`/orders/${id}`}>
                    <AiFillEye />
                </Link>
            </div>
        </OrderC>
    )
}

export default React.memo(Order);
