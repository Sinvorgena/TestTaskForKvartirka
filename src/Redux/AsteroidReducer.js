import {Api} from "../dal/api";

let SET_COMPANIES_DATA = "SET_COMPANIES_DATA"
let SET_SELECTED_COMPANY_ID = "SET_SELECTED_COMPANY_ID"
let SET_HOUSE_DATA = "SET_HOUSE_DATA"
let SET_CURRENT_PAGE = "SET_CURRENT_PAGE"

let CompaniesDefaulState = {
    companiesData: [],
    houseData: [],
    currentCompanyId: "",
    nextPage: 0,
    currentPage: 0,
    lastPage: 0,
    prevPage: 0

}

export const CompaniesReducer = (state = CompaniesDefaulState, action) => {
    let copyState;
    switch (action.type) {
        case SET_COMPANIES_DATA:
            copyState = {
                ...state,
                companiesData: [...action.companiesData]
            }
            return copyState
        case SET_HOUSE_DATA:
            copyState = {
                ...state,
                houseData: [...action.houseData],
                nextPage: action.nextPage,
                currentPage: action.currentPage,
                lastPage: action.lastPage,
                prevPage: action.prevPage
            }
            return copyState
        case SET_SELECTED_COMPANY_ID:
            copyState = {
                ...state,
                currentCompanyId: action.currentCompanyId
            }
            return copyState
        case SET_CURRENT_PAGE:
            copyState = {
                ...state,
                currentPage: action.currentPage
            }
            return copyState
        default:
            return state
    }
}

export let setCompaniesDataSucsess = (companiesData) => ({
    type: SET_COMPANIES_DATA,
    companiesData
})
export let setHouseDataSucsess = (houseData, currentPage, lastPage, nextPage, prevPage) => ({
    type: SET_HOUSE_DATA,
    houseData, nextPage, currentPage, lastPage, prevPage
})
export let setSelectedCompanyId = (currentCompanyId) => ({
    type: SET_SELECTED_COMPANY_ID,
    currentCompanyId
})
export let setHouseData = (company_id, page) => {
    return (dispatch) => {
        Api.houseData.getHouse(company_id, page).then(response => {
                dispatch(setHouseDataSucsess(response.data.data, response.data.links.currentPage, response.data.links.lastPage, response.data.links.nextPage, response.data.links.prevPage))
            }
        )
    }
}
export let metaDataHouseToNull = () => {
    return (dispatch) => {
        dispatch(setHouseDataSucsess([], null, null, null, null))
        debugger
    }
}


window.CompaniesDefaulState = CompaniesDefaulState


