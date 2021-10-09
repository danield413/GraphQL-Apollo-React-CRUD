import React from 'react'
import styled from 'styled-components'

const Main = styled.main`
    display: ${(props) => {
        if(props.flex) return 'flex'
        if(props.grid) return 'grid'
    }};
    justify-content: ${(props) => props.flex && 'center'};
    align-items: ${(props) => props.flex && 'center'};
    grid-template-columns: ${(props) => props.grid && '1fr 1fr'};
    width: 100%;
    height: calc(100vh - 80px);
    overflow-y: auto;
    background-color: #252525;
`

const FormWrapper = ( {children, isFlex = false, isGrid = false} ) => {
    return (
        <Main flex={isFlex} grid={isGrid}>
            { children }
        </Main>
    )
}

export default FormWrapper
