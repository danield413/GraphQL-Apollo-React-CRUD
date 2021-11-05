import React from 'react'
import styled from 'styled-components'

const Main = styled.main`
    height: calc(100vh - 80px);
    width: 100%;
    background-color: #181818;
    position: relative;
    overflow: auto;
    padding: 20px 40px;

    .header {
        display: grid;
        grid-template-columns: 80% 20%;
        
        h1 {
            color: #00d9ff;
            font-family: 'GT-L';
            font-size: 4rem;
            filter: drop-shadow(0px 0px 2px #00d9ff);
        }

        .header-item {
            display: flex;
            align-items: center;
            justify-content: end;
    
            span {
                color: white;
            }
        }
    }

    @media screen and (max-width: 768px){
        padding: 10px 15px;
        .header {
            grid-template-columns: 60% 40%;
            h1 {
                font-size: 2.2rem;
            }
            .header-item {
                span {
                    font-size: .9rem;
                }
            }
        }
    }

`

const PageWrapper = ( {children, title, count} ) => {
    return (
        <Main>
            <div className="header">
                <div><h1 className="no-selectable">{title}</h1></div>
                {count &&  <div className="header-item no-selectable"><span>{count} {title}</span></div>}
            </div>
            { children }
        </Main>
    )
}

export default PageWrapper
