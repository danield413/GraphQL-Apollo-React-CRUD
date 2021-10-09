
export const reducer = ( state, action ) => {
    switch (action.type) {
        case 'ORDER_ADD_PRODUCT':
            return {
                ...state,
                order: [
                    action.payload,
                    ...state.order
                ]
            }
        case 'ORDER_RESET': 
            return {
                ...state,
                order: []
            }
        default: return state;
    }
}