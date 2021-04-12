import {applyMiddleware, combineReducers, createStore} from "redux";
import {AsteroidsReducer} from "./AsteroidReducer";
import thunkMidleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'

let redusers = combineReducers({
    Asteroids: AsteroidsReducer,
    form: formReducer
})

let store = createStore(redusers, applyMiddleware(thunkMidleware))

window.store = store

export default store