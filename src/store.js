import {applyMiddleware,legacy_createStore,combineReducers} from 'redux'
import { thunk } from 'redux-thunk'

const rootReducer = combineReducers({

})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))
