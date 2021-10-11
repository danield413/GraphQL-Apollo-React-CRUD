import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import useForm from '../hooks/UseForm'
import { GET_ORDERS, GET_PRODUCTS } from '../GraphQL/queries'
import filter from '../utils/filter'
import Spinner from './Spinner'
import Product from './Product'

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 80px);
    background-color: #181818;
    padding: 0 40px;
    
  	.filtered {
		background-color: #333333;
		height: 70vh;
		border-radius: 16px;
		position: relative;
		overflow-y: auto;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		row-gap: 20px;
		padding: 20px 0;

		.alert {
			color: white;
            position: absolute;
            top: 50%;  
            left: 50%; 
            transform: translate(-50%, -50%);
            font-size: 1.1rem;
            font-family: 'GT-L';
		}
	}
`
const Div = styled.div`
	padding: 1rem 0;
	display: flex;
	justify-content: center;
	input {
		height: 40px;
		width: 40%;
		outline: none;
		padding: 0 10px;
		background-color: transparent;
		border: 2px solid rgba(0, 134, 211, 0.4);
		border-radius: 5px;
		transition: 0.2s ease-in-out;
		font-family: 'GT-L';
		color: white;
		font-size: 1rem;

		::placeholder {
			color: #eee;
		}
		:focus {
			border: 2px solid #0084ff;
		}
	}
  
`

const Search = ( {type} ) => {

    const [ state, handleChange ] = useForm({ search: '' });
    const { search } = state;

    const { loading, data } = useQuery((type === 'productos') ? GET_PRODUCTS : GET_ORDERS, {
      fetchPolicy: 'cache-first'
    });

    return (
      <Container>
          <Div>
            <input 
				type="text" 
				name="search"
				placeholder={`Buscar ${type}`}
				onChange={handleChange} 
				autoComplete="off"
            />  
          </Div>

          <div className="filtered animate__animated animate__fadeIn">
            { (!data && loading) && <Spinner />}
			{search.length === 0 && <span className="alert no-selectable animate__animated animate__fadeIn">Busca por nombre</span>}
            {(data && search.length > 0) && data.obtenerProductos.map( ({id, nombre, precio, disponible}) => {
              const isInSearch = filter(nombre, search);
              if(isInSearch) {
                return <Product 
							key={id} 
							id={id} 
							nombre={nombre} 
							precio={precio} 
							disponible={disponible} 
						/>
              }
            })}
          </div>
          
      </Container>
    )
}

export default Search
