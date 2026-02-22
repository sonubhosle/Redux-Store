import {applyMiddleware,legacy_createStore,combineReducers} from 'redux'
import { thunk } from 'redux-thunk'
import authReducer from './states/Auth/Reducer'
import productReducer from './states/Products/Reducer'
const rootReducer = combineReducers({
  auth: authReducer,
   product: productReducer,
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))
