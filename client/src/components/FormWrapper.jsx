import React from 'react'
import styled from 'styled-components'

const Main = styled.main`
    display: ${(props) => props.flex && 'flex'};
    justify-content: ${(props) => props.flex && 'center'};
    align-items: ${(props) => props.flex && 'center'};
    width: 100%;
    height: calc(100vh - 80px);
    overflow-y: auto;
    background-color: #252525;
`

const FormWrapper = ( {children, isFlex = false} ) => {
    return (
        <Main flex={isFlex}>
            { children }
        </Main>
    )
}

export default FormWrapper
