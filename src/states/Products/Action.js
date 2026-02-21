
import axios from "axios";
import { GET_ALL_PRODUCTS_FALURE, GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS } from "./Types"

export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_PRODUCTS_REQUEST });
        const res = await axios.get('http://localhost:8585/api/v1/products/');

        dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: GET_ALL_PRODUCTS_FALURE })
    }
}