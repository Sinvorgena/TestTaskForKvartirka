import * as axios from "axios";

const instanse = axios.create({
    baseURL: "https://api.nasa.gov/neo/rest/v1/"

})
let token = ""

export const Api = {
    Asteroid: {
        getAsteroid(start, end) {
            return instanse.get(`feed?api_key=q7EZGNZYBD9g3jNUvz7PsIHX2U9gGtGgRgSL4ziQ&start_date=${start}&end_date=${end}`)
        }
    }

}

window.Api = Api
window.token = token