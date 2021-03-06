import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import useForm from '../hooks/UseForm'
import { GET_ORDERS, GET_PRODUCTS } from '../GraphQL/queries'
import filter from '../utils/filter'
import Spinner from './Spinner'
import Product from './Product'
import Order from './Order'

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
		padding: ${props => props.type === 'productos' ? '20px 0' : '0 0 20px 0'};

		.alert {
			color: white;
            position: absolute;
            top: 50%;  
            left: 50%; 
            transform: translate(-50%, -50%);
            font-size: 1.1rem;
            font-family: 'GT-L';
		}
		.btn {
			height: 40px;
			border: none;
			background-color: rgba(255,255,255,.2);
			color: white;
			font-family: 'GT-L';
			font-size: 1rem;
			cursor: pointer;
			transition: .3s ease-in-out;
			&.active {
				background-color: #00d9ff75;
			}
		}
		.no-grid {
			padding: 0 20px;
			overflow-y: auto;
			grid-column: 1/4;
		}
	}
	@media screen and (max-width: 1000px) {
		.filtered {
			padding: 20px;
			grid-template-columns: repeat(2, 1fr);
			.alert {
				width: 100%;
				font-size: .9rem;
				text-align: center;
			}
			.no-grid {
				grid-column: 1/3;
			}
		}
	}
	@media screen and (max-width: 768px) {
		padding: 0 20px;
		.filtered {
			grid-template-columns: 1fr;
			height: calc(90vh - 100px);
			.no-grid {
				grid-column: 1/2;
			}
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
	@media screen and (max-width: 1000px) {
		input {
			width: 80%;
		}
	}
	@media screen and (max-width: 768px) {
		input {
			width: 100%;
		}
	}
`

const Search = ( {type} ) => {

	const [ typeOfOrder, setTypeOfOrder ] = useState('PENDIENTE');
    const [ state, handleChange ] = useForm({ search: '' });
    const { search } = state;

    const { loading, data } = useQuery((type === 'productos') ? GET_PRODUCTS : GET_ORDERS, {
      fetchPolicy: 'cache-first',
	  variables: {
		  input: (type === '??rdenes') && typeOfOrder
	  }
    });
	
    return (
      <Container type={type}>
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
			{search.length === 0 && <span className="alert no-selectable animate__animated animate__fadeIn">{type ==='productos' ? 'Busca por nombre de producto' : 'Busca por nombre de usuario' }</span>}
			{/* //Productos */}
            {(data && data.obtenerProductos && search.length > 0) && data.obtenerProductos.map( ({id, nombre, precio, disponible}) => {
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
			{/* ??rdenes */}
			{
				type === '??rdenes' &&
				<>
					<button
						onClick={() => setTypeOfOrder('COMPLETADA')}
						className={`btn ${typeOfOrder === 'COMPLETADA' && 'active' } `}>
						Completadas
					</button>
					<button
						onClick={() => setTypeOfOrder('PENDIENTE')}
						className={`btn ${typeOfOrder === 'PENDIENTE' && 'active' } `}>
						Pendientes
					</button>
					<button
						onClick={() => setTypeOfOrder('CANCELADA')}
						className={`btn ${typeOfOrder === 'CANCELADA' && 'active' } `}>
						Canceladas
					</button>
				</>
			}
          
		  	<div className="no-grid">
			  	{(data && data.obtenerOrdenes && search.length > 0) &&
				data.obtenerOrdenes.map( ({id, usuario, mesa, total, fecha}) => {
					const isInSearch = filter(usuario, search);
					if(isInSearch) {
						return <Order
									key={id}
									id={id}
									usuario={usuario}
									mesa={mesa}
									total={total}
									fecha={fecha}
								/>
					}
				})}
			  	</div>
          	</div>
      </Container>
    )
}

export default Search
