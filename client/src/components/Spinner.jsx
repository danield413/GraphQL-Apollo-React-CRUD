import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
    display: inline-block;
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    

    &:after{
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 10px solid #00d9ff;
        border-color: #00d9ff transparent #00d9ff transparent;
        animation: lds-dual-ring 1.2s linear infinite;
        transition: .2 ease;
        filter: drop-shadow(0px 0px 10px #00d9ff);
    }

    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`

const Spinner = () => {
    return (
        <Div />
    )
}

export default Spinner
