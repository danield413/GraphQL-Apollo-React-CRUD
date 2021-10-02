import styled from 'styled-components'
import { VscChromeClose } from 'react-icons/vsc'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const pages = {
    home: 'HOME',
    products: 'PRODUCTS',
    orders: 'ORDERS'
}

const SideBar = styled.aside`
    position: absolute;
    height: 100vh;
    width: 18rem;
    background-color: black;
    z-index: 99;
    left: ${props => props.isOpen ? "0" : "-100%"};
    
    transition: .4s ease-in-out;
    & .header {
        display: grid;
        grid-template-columns: 70% 30%;
        background-color: #7000FF;
        height: 80px;
        padding: 10px;
        position: relative;
        & h2 {
            color: #fff;
            display: flex;
            align-items: center;
        }
        & div {
            display: flex;
            justify-content: center;
            align-items: center;
            & button {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 3rem;
                height: 3rem;
                background-color: rgba(255,255,255,.2);
                border: none;
                border-radius: 50%;
                position: absolute;
                right: 10px;
                top: 10px;
                cursor: pointer;
                transition: all .2s;
                :hover {
                    background-color: rgba(255,255,255,.5);
                }
            }
        }
    }
    & .main {
        & h3 {
            margin-left: 10px;
            margin-bottom: 10px;
            color: #fff;
        }
        & ul li .btn {
            margin: 0 auto;
            display: block;
            width: 100%;
            height: 3rem;
            text-decoration: none;
            text-align: center;
            line-height: 3rem;
            border-left: 3px solid #7000FF;
            background-color: transparent;
            font-weight: bold;
            color: white;
            transition: .3s ease-in-out;
            font-family: 'GT-L';

            :hover {
                background-color: #7000FF;
                color: #fff;
                border-left: 3px solid #fff;
            }
        }
        & ul li .active {
            background-color: #7000FF;
            color: #fff;
            border-left: 3px solid #fff;
            font-family: 'GT-M';
        }
    }
`

const SideNav = ({handleClose, isOpen}) => {

    let { pathname } = useLocation();
    const [location, setlocation] = useState('HOME')


    useEffect(() => {
        if(pathname.includes('products')) {return setlocation(pages.products)};
        if(pathname.includes('orders')) {return setlocation(pages.orders)};
        setlocation(pages.home)
    }, [pathname])

    return (
        <SideBar isOpen={isOpen}>
            <div className="header">
                <h2>Editor</h2>
                <div>
                    <button
                        onClick={handleClose}
                    >
                        <VscChromeClose size="1.7rem" color="#fff" />
                    </button>
                </div>  
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 320"><path fill="#7000FF" fillOpacity="1" d="M0,192L60,208C120,224,240,256,360,229.3C480,203,600,117,720,85.3C840,53,960,75,1080,80C1200,85,1320,75,1380,69.3L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>

            <div className="main">
                <h3>Opciones</h3>
                <ul>
                    {
                        (location === pages.products || location === pages.home) && 
                        <>
                            <li onClick={handleClose} ><Link to="/products/new" className={`btn ${pathname === '/products/new' && 'active'}`}>Nuevo Producto</Link></li>
                            <li onClick={handleClose} ><Link to="/products/search" className={`btn ${pathname === '/products/search' && 'active'}`}>Buscar Producto</Link></li>
                            <li onClick={handleClose} ><Link to="/products" className={`btn ${pathname === '/products' && 'active'}`}>Todos los Productos</Link></li>
                            <li onClick={handleClose} ><Link to="/" className={`btn ${pathname === '/' && 'active'}`}>Inicio</Link></li>
                        </>
                    }
                    {
                        (location === pages.orders) && 
                        <>  
                            <li onClick={handleClose} ><Link to="/orders/new" className={`btn ${pathname === '/orders/new' && 'active'}`}>Nueva Orden</Link></li>
                            <li onClick={handleClose} ><Link to="/orders" className={`btn ${pathname === '/orders' && 'active'}`}>Ordenes pendientes</Link></li>
                            <li onClick={handleClose} ><Link to="/orders/search" className={`btn ${pathname === '/orders/search' && 'active'}`}>Buscar orden</Link></li>
                            <li onClick={handleClose} ><Link to="/" className={`btn ${pathname === '/' && 'active'}`}>Inicio</Link></li>
                        </>
                    }
                </ul>
            </div>
        </SideBar>
    )
}

export default SideNav
