import styled from "styled-components"

export const FormS = styled.form`
    width: 26rem;
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

export const Input = styled.input`
    margin-bottom: 20px;
    width: 100%; 
    height: 2.5rem;
    border: 2px solid rgba(0, 134, 211, 0.4);
    border-radius: 5px;
    background-color: transparent;
    padding-left: 10px;
    outline: none;
    transition: 0.2s ease-in-out;
    color: white;
    font-family: 'GT-L';
    font-size: .9rem;

    ::placeholder {
        color: #eee;
    }
    :focus {
        border: 2px solid #0084ff;
    }

`

export const Submit = styled.input`
    width: 100%; 
    height: 2.5rem;
    background-color: #0084ff;
    outline: none;
    border: none;
    border-radius: 5px;
    color: #fff;
    transition: ease-in-out .2s;
    cursor: pointer;
    font-weight: bold;
    font-size: .9rem;
    outline: 3px solid transparent;

    :hover {
        background-color: #006cd1;
    }
    :disabled {
        background-color: #444444;
        cursor: not-allowed;
    }
    :focus {
        outline: 3px solid rgba(0,108,208,.4);
    }
`

export const LabelContainer = styled.div`
    margin-bottom: 12px;
    & label {
        display: inline;
        color: white;
        font-size: .9rem;
        font-family: 'GT-L';
    }
`

export const Radio = styled.input.attrs({
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