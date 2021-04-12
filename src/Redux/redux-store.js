import {applyMiddleware, combineReducers, createStore} from "redux";
import {CompaniesReducer} from "./CompaniesReducer";
import {authReducer} from "./AuthReduces";
import thunkMidlewarenk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'

let redusers = combineReducers({
    Companies: CompaniesReducer,
    Auth: authReducer,
    form: formReducer
})

let store = createStore(redusers, applyMiddleware(thunkMidlewarenk))

window.store = store

export default store