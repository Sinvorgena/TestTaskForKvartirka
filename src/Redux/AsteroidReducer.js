import {Api} from "../Dal/api";
import React from "react";


let SET_ASTEROID_DATA = "SET_ASTEROID_DATA"
let TOOGLE_API_IS_PENDING = "TOOGLE_API_IS_PENDING"
let TOOGLE_STATUS_OF_LOADING_DATA = "TOOGLE_STATUS_OF_LOADING_DATA"
let SET_EMPTY_DANGEROUS_DATA_COUNT = "SET_EMPTY_DANGEROUS_DATA_COUNT"
let SET_CURRENT_APP_PAGE = "SET_CURRENT_APP_PAGE"
let ADD_ASTEROID_TO_DESTROY = "ADD_ASTEROID_TO_DESTROY"
let CLEAR_BASKET = "CLEAR_BASKET"


let AsteroidsDefaulState = {
    asteroidData: [],
    dangerousAsteroidData: [],
    asteroidToDestroyData: [],
    now: new Date(),
    maxToMinSizeSort: false,
    requestIsPending: false,
    statusOfLoadingData: false,
    emptyDangerousDataCount: 0,
    currentAppPage: ""
}

export const AsteroidsReducer = (state = AsteroidsDefaulState, action) => {
    let copyState;
    switch (action.type) {
        case SET_ASTEROID_DATA:
            copyState = {
                ...state,
                asteroidData: [...state.asteroidData, ...action.asteroidData],
                dangerousAsteroidData: [...state.dangerousAsteroidData, ...action.dangerousAsteroidData]
            }
            let uniq = []
            let dangerousUniq = []


            copyState.asteroidData.forEach(element=>{
                if(!uniq.some(ele=>ele.id == element.id)){
                    uniq.push(element)
                }
            })
            copyState.dangerousAsteroidData.forEach(element=>{
                if(!dangerousUniq.some(ele=>ele.id == element.id)){
                    dangerousUniq.push(element)
                }
            })
            copyState.asteroidData = uniq
            copyState.dangerousAsteroidData = dangerousUniq
            return copyState
        case TOOGLE_API_IS_PENDING:
            copyState = {
                ...state,
                requestIsPending: action.bollean
            }
            return copyState
        case TOOGLE_STATUS_OF_LOADING_DATA:
            copyState = {
                ...state,
                statusOfLoadingData: action.bollean
            }
            return copyState
        case SET_EMPTY_DANGEROUS_DATA_COUNT:
            copyState = {
                ...state
            }
            if(action.bollean) {copyState.emptyDangerousDataCount++}else{copyState.emptyDangerousDataCount--}

            return copyState
        case SET_CURRENT_APP_PAGE:
            copyState = {
                ...state,
                currentAppPage: action.currentAppPage
            }

            return copyState
        case ADD_ASTEROID_TO_DESTROY:
            copyState = {
                ...state
            }
            const alredyHas = (element) => element.id  === action.asteroid.id;
            if(!(copyState.asteroidToDestroyData.some(alredyHas))){
                copyState.asteroidToDestroyData.push(action.asteroid)
            } else{
                copyState.asteroidToDestroyData = copyState.asteroidToDestroyData.filter(el=>{if(el.id!=action.asteroid.id) return el})
            }

            return copyState
        case CLEAR_BASKET:
            copyState = {
                ...state,
                asteroidToDestroyData: []
            }
            debugger
            return copyState
        default:
            return state
    }
}

export let setAsteroidDataSucsess = (asteroidData, dangerousAsteroidData, emptyDangerousDataCount) => ({
    type: SET_ASTEROID_DATA,
    asteroidData, dangerousAsteroidData
})
export let toogleApiIsPending = (bollean) => ({
    type: TOOGLE_API_IS_PENDING,
    bollean
})
export let toogleStatusOfLoadingData = (bollean) => ({
    type: TOOGLE_STATUS_OF_LOADING_DATA,
    bollean
})
export let setEmptyDangerousDataCount = (bollean) => ({
    type: SET_EMPTY_DANGEROUS_DATA_COUNT,
    bollean
})
export let setCurrentAppPage = (currentAppPage) => ({
    type: SET_CURRENT_APP_PAGE,
    currentAppPage
})
export let addAsteroidToDestroy = (asteroid) => ({
    type: ADD_ASTEROID_TO_DESTROY,
    asteroid
})
export let cleatBasket = () => ({
    type: CLEAR_BASKET
})
export let setHouseData = (start, end, key) => {
    return (dispatch) => {
        dispatch(toogleApiIsPending(true))
        Api.Asteroid.getAsteroid(start, end, key).then((response) => {
            if(response.data.element_count){
            let arrayMax = []
            for (let key in response.data.near_earth_objects) {
                arrayMax = [...arrayMax, ...response.data.near_earth_objects[key].map(el => el)]
            }
                for(let el of arrayMax){
                    el.selectedToDestoy = false
                }

            let dangerousAsteroidData = arrayMax.filter(el => {
                if (el.is_potentially_hazardous_asteroid) {
                    return el
                }
            })
            if(window.store.getState().Asteroids.dangerousAsteroidData.length < 5 || dangerousAsteroidData.length<2){
                dispatch(setEmptyDangerousDataCount(true))
                dispatch(setAsteroidDataSucsess(arrayMax, dangerousAsteroidData))
            } else {
                dispatch(setAsteroidDataSucsess(arrayMax, dangerousAsteroidData))
            }
            dispatch(toogleApiIsPending(false))

            console.log(arrayMax)
            console.log(dangerousAsteroidData)
            console.log(AsteroidsDefaulState.emptyDangerousDataCount)
            } else{
                console.log("empty")
            }

        })

    }
}


window.AsteroidsDefaulState = AsteroidsDefaulState


