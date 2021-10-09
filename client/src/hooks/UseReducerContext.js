import { useContext } from "react"
import myContext from "../context/context"

const useReducerContext = () => {
    const {state, dispatch} = useContext(myContext)
    return { state, dispatch }
}

export default useReducerContext
