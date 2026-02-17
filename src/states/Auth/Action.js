import axios from "axios";
import { api, API_BASE_URL } from "../../config/apiConfig";
import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILD } from "./Types";

const saveJwt = (jwt) => {
    localStorage.setItem('jwt', jwt)
}


