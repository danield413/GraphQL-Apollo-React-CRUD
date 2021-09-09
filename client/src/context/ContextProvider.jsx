import React from 'react'
import MyContext from './context'

const ContextProvider = ( {children} ) => {
    return (
        <MyContext.Provider value={{}}>
            {children}
        </MyContext.Provider>
    )
}

export default ContextProvider
