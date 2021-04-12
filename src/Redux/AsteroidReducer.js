import {Api} from "../Dal/api";
import React from "react";
import {act} from "@testing-library/react";

let SET_ASTEROID_DATA = "SET_ASTEROID_DATA"
let TOOGLE_API_IS_PENDING = "TOOGLE_API_IS_PENDING"
let TOOGLE_STATUS_OF_LOADING_DATA = "TOOGLE_STATUS_OF_LOADING_DATA"
let SET_EMPTY_DANGEROUS_DATA_COUNT = "SET_EMPTY_DANGEROUS_DATA_COUNT"
let AsteroidsDefaulState = {
    asteroidData: [],
    dangerousAsteroidData: [],
    maxToMinSizeSort: false,
    requestIsPending: false,
    statusOfLoadingData: false,
    emptyDangerousDataCount: 0
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
export let setHouseData = (start, end, sortByDangerous) => {
    return (dispatch) => {
        dispatch(toogleApiIsPending(true))
        Api.Asteroid.getAsteroid(start, end).then((response) => {
            let arrayMax = []
            for (let key in response.data.near_earth_objects) {
                arrayMax = [...arrayMax, ...response.data.near_earth_objects[key].map(el => el)]
            }
            let dangerousAsteroidData = arrayMax.filter(el => {
                if (el.is_potentially_hazardous_asteroid) {
                    return el
                }
            })

            if(window.store.getState().Asteroids.dangerousAsteroidData.length < 5){
                dispatch(setEmptyDangerousDataCount(true))
                dispatch(setAsteroidDataSucsess(arrayMax, dangerousAsteroidData))
            } else {
                dispatch(setAsteroidDataSucsess(arrayMax, dangerousAsteroidData))
            }
            dispatch(toogleApiIsPending(false))
            console.log(arrayMax)
            console.log(dangerousAsteroidData)
            console.log(AsteroidsDefaulState.emptyDangerousDataCount)


        })

    }
}


window.AsteroidsDefaulState = AsteroidsDefaulState


