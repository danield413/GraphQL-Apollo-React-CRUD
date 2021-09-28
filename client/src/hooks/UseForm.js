import { useState } from 'react'

const useForm = ( initialState = {} ) => {
    const [state, setState] = useState( initialState );

    const handleChange = ( {target} ) => {
        const { value, name } = target;
        setState({
            ...state,
            [name] : value
        })
    }

    const reset = () => {
        setState({});
    }

    return [
        state,
        handleChange,
        reset
    ]

}

export default useForm
