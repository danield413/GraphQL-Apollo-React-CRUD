import React, { useReducer } from 'react'
import { reducer } from '../reducer/reducer'
import MyContext from './context'

const initialState = {
    order: []
}

const ContextProvider = ( {children} ) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <MyContext.Provider value={{ state, dispatch }}>
            {children}
        </MyContext.Provider>
    )
}

export default ContextProvider
