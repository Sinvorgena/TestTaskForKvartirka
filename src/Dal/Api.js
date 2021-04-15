import * as axios from "axios";

const instanse = axios.create({
    baseURL: "https://api.nasa.gov/neo/rest/v1/"

})
let token = ""

export const Api = {
    Asteroid: {
        getAsteroid(start, end, key = false) {
            if (window.location.pathname == "/Asteroids" || key == true) {
                return instanse.get(`feed?api_key=q7EZGNZYBD9g3jNUvz7PsIHX2U9gGtGgRgSL4ziQ&start_date=${start}&end_date=${end}`)

            } else {
                const promise1 = new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve({
                            data: {
                                element_count: 0
                            }
                        });
                    }, 300);
                });
                return promise1
            }
        }
        ,
        getConcreteAsteroid(asteroidId){
            return axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=q7EZGNZYBD9g3jNUvz7PsIHX2U9gGtGgRgSL4ziQ`)
        }
    }

}

window.Api = Api
window.token = token