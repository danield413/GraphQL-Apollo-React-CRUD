import React from 'react'
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

const Main = styled.main`
    width: 100%;
    background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
    height: calc(100vh - 80px);
    & div {
        height: 40vh;
        display: flex;
        justify-content: center;
        flex-direction: column;
        & h1,h3{
            margin-left: 40px;
        }
        & h1{
            font-size: 4rem;
            color: #fff;
        }
        & h3{
            color: #eee;
        }
    }
`;
const Home = () => {
    return (
        <>
            <Helmet>
                <title>Inicio - ReactGraphQL</title>
            </Helmet>
            <Main>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 200"><path fill="#202020" fillOpacity="1" d="M0,64L40,74.7C80,85,160,107,240,133.3C320,160,400,192,480,176C560,160,640,96,720,74.7C800,53,880,75,960,90.7C1040,107,1120,117,1200,106.7C1280,96,1360,64,1400,48L1440,32L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>

              <div>
                <h1 className="no-selectable animate__animated animate__fadeIn">Hola, administrador</h1>
                <h3 className="no-selectable animate__animated animate__fadeIn">Es hora de administrar tu negocio</h3>
              </div>

            </Main>
        </>
    )
}

export default Home
