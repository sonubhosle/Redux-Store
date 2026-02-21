import { GET_ALL_PRODUCTS_FALURE, GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS } from "./Types"



const initialState = {
    products: [],
    loading: true,
    error:null

}


const productReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_PRODUCTS_REQUEST:
            return { ...state, loading: true, error: null }
        case GET_ALL_PRODUCTS_SUCCESS:
            return { ...state, products: action.payload, loading: false, error: null }
        case GET_ALL_PRODUCTS_FALURE:
            return { ...state, loading: false, error: action.payload }

        default:
    return state
    }
}


export default productReducer;