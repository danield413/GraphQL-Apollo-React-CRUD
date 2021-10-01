import { useCallback, useState } from 'react'

const useForm = ( initialState = {} ) => {
    const [state, setState] = useState( initialState );

    const handleChange = useCallback(( {target} ) => {
        const { value, name } = target;
        setState(prevState => {
            return {
                ...prevState,
                [name] : value
            }
        })
    }, [])

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
