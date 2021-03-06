import React, { useState } from 'react'
import styled from 'styled-components'
import { BiMenuAltLeft } from 'react-icons/bi'
import { HiOutlineViewGrid, HiOutlineLightBulb } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import SideNav from './SideNav';

export const NavBar = styled.nav`
    width: 100%;
    height: 80px;
    background: #202020;
    display: flex;
    align-items: center;

    & ul {
        display: flex;
        align-items: center;
    }

    & ul li {
        display: inline-block;
        margin-left: 20px;
    }
    & ul li:first-child {
        margin-left: 40px;
    }

    & ul li a {
        font-size: 1rem;
        padding: 8px 12px;
        background-color: rgba(255,255,255,.2);
        color: #fff;
        border-radius: 10px;
        text-decoration: none;
        display: flex;
        align-items: center;
        font-weight: 400;
        transition: .5s ease-in-out;
        font-family: 'GT-L';

        & svg {
            margin-right: .4rem;
        }
        :hover {
            background-color: #00d9ff75;
        }
    }

    & .active {
        background-color: #00d9ff75;
    }

    & ul li button {
        width: 3rem;
        height: 3rem;
        background-color: rgba(255,255,255,.2);
        border: none;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: ease-in-out .2s;
        :focus {
            outline: 3px solid white;
        }
        
    }
    @media screen and (max-width: 768px){
        & ul li:first-child {
            margin-left: 20px;
        }
    }
`;


const Nav = () => {

    const [isOpen, setIsOpen] = useState(false);
    const { pathname } = useLocation();

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <>
        <SideNav handleClose={handleClose} isOpen={isOpen}/>
        <header>
            <NavBar>
                <ul>

                    <li>
                        <button
                            onClick={handleOpen}
                        >
                            <BiMenuAltLeft size="1.6rem" color="#fff" />
                        </button>
                    </li>

                    <li>
                        <Link to="/products" className={`${pathname.includes('products') && 'active'}`} >
                            <HiOutlineViewGrid />
                            Productos
                        </Link>
                    </li>

                    <li>
                        <Link to="/orders" className={`${pathname.includes('orders') && 'active'}`}>
                            <HiOutlineLightBulb />
                            ??rdenes
                        </Link>
                    </li>

                </ul>
            </NavBar>
        </header>
        </>
    )
}

export default Nav
