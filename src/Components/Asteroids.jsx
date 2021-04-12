import React from "react";
import {connect} from "react-redux";
import {
    setEmptyDangerousDataCount,
    setHouseData,
    toogleApiIsPending,
    toogleStatusOfLoadingData
} from "../Redux/AsteroidReducer";
import s from "./Asteroids.module.css"
import dino from "../dino.png"
import Preloader from "./Preloader";


class Asteroids extends React.Component {
    componentDidMount() {
        this.startWith = this.getCurrentFormatDate()
        console.log(this.startWith)
        this.endWith = this.getCurrentFormatDate()
        console.log(this.endWith)
        this.props.setHouseData(this.startWith, this.endWith)
    }

    getAsteroids = () => {
        this.addDayToDate(1)
        this.startWith = this.getCurrentFormatDate()
        this.endWith = this.getCurrentFormatDate()
        this.props.setHouseData(this.startWith, this.endWith)
    }
    getAsteroidsByScroll = () => {
        if (window.scrollY >= (document.documentElement.scrollHeight - window.visualViewport.height - 50)) {

            this.countOfScroll++
            if (this.countOfScroll % 8 == 0 && !this.props.requestIsPending) {
                this.props.toogleApiIsPending(true)
                console.log("fsdffs")
                this.getAsteroids()
            }
        }
    }

    // style={{backgroundImage: `${el.is_potentially_hazardous_asteroid}`? `linear-gradient(to right, #CFF37D, #7DE88C)`:`linear-gradient(to right, #FFB199, #FF0844)`}}
    asteroidComponentMapOnDataSortByDistanseToEarth = (el) => {
        return (
            <div className={el.is_potentially_hazardous_asteroid?s.DangerousAsteroidBakcground:s.SaftiAsteroidBakcground}
            >
                <div className={s.AsteroidBox} id={el.id}
                     style={{backgroundSize: `${(((el.estimated_diameter.meters.estimated_diameter_max + el.estimated_diameter.meters.estimated_diameter_min) / 2) / 75) * 10}%`}}>
                    <div className={s.imageBox}><img src={dino} alt=""/></div>
                    <div className={s.asteroidInfo}>
                        <p>
                            {el.name.slice(el.name.indexOf("(") + 1,
                                el.name.length - 1)}
                        </p>
                        <p className={s.testBorder}><span className={s.test1}>Дата</span><span
                            className={s.test2}></span>
                            <span className={s.test3}>{el.close_approach_data[0]
                                .close_approach_date}
                                </span>
                        </p>
                        <p className={s.testBorder}>
                        <span className={s.test1}>
                            Расстояние
                        </span>
                            <span className={s.test2}></span>
                            <span className={s.test3}>{new Intl.NumberFormat('ru-RU').format(Math.ceil(el
                                .close_approach_data[0].miss_distance
                                .kilometers))} км до земли</span>
                        </p>
                        <p className={s.testBorder}>
                            <span className={s.test1}>Размер</span>
                            <span className={s.test2}></span>
                            <span
                                className={s.test3}>{Math.ceil((el.estimated_diameter.meters.estimated_diameter_max + el.estimated_diameter.meters.estimated_diameter_min) / 2)} м</span>
                        </p>
                    </div>
                    <div className={s.destroyedBox}>
                        <p>Оценка:
                            <p style={{fontWeight:700}}>{el.is_potentially_hazardous_asteroid ? "опасен" : "не опасен"}</p>
                        </p>
                        <button className={s.btnToDestroyAsteroid}>На уничтожение</button>
                    </div>
                </div>
            </div>)
    }
    asteroidComponentMapOnDataSortByDistanseToMoon = (el) => {
        return (
            <div className={el.is_potentially_hazardous_asteroid?s.DangerousAsteroidBakcground:s.SaftiAsteroidBakcground}
            >
                <div className={s.AsteroidBox} id={el.id}
                     style={{backgroundSize: `${(((el.estimated_diameter.meters.estimated_diameter_max + el.estimated_diameter.meters.estimated_diameter_min) / 2) / 75) * 10}%`}}>
                    <div className={s.imageBox}><img src={dino} alt=""/></div>
                    <div className={s.asteroidInfo}>
                        <p>
                            {el.name.slice(el.name.indexOf("(") + 1,
                                el.name.length - 1)}
                        </p>
                        <p className={s.testBorder}><span className={s.test1}>Дата</span><span
                            className={s.test2}></span>
                            <span className={s.test3}>{el.close_approach_data[0]
                                .close_approach_date}
                                </span>
                        </p>
                        <p className={s.testBorder}>
                        <span className={s.test1}>
                            Расстояние
                        </span>
                            <span className={s.test2}></span>
                            <span className={s.test3}>{new Intl.NumberFormat('ru-RU').format(Math.ceil(el
                                .close_approach_data[0].miss_distance
                                .lunar))} км до луны</span>
                        </p>
                        <p className={s.testBorder}>
                            <span className={s.test1}>Размер</span>
                            <span className={s.test2}></span>
                            <span
                                className={s.test3}>{Math.ceil((el.estimated_diameter.meters.estimated_diameter_max + el.estimated_diameter.meters.estimated_diameter_min) / 2)} м</span>
                        </p>
                    </div>
                    <div className={s.destroyedBox}>
                        <p>Оценка:
                            <p style={{fontWeight:700}}>{el.is_potentially_hazardous_asteroid ? "опасен" : "не опасен"}</p>
                        </p>
                        <button className={s.btnToDestroyAsteroid}>На уничтожение</button>
                    </div>
                </div>
            </div>)
    }
    now = new Date()
    startWith = 0
    endWith = 0
    getCurrentFormatDate = () => {
        return `${this.now.getFullYear()}-${this.now.getMonth() < 9 ? "0" + (this.now.getMonth() + 1) : this.now.getMonth() + 1}-${this.now.getDate() < 10 ? "0" + this.now.getDate() : this.now.getDate()}`
    }
    addDayToDate = (days) => {
        this.now.getDate(this.now.setDate(this.now.getDate() + days))
    }
    state = {
        asteroidField: this.props.asteroidData.map((el) => this.asteroidComponentMapOnDataSortByDistanseToEarth(el)),
        dangerousAsteroidField: this.props.dangerousAsteroidData.map((el) => this.asteroidComponentMapOnDataSortByDistanseToEarth(el)),
        dangerousSort: null,
        sortByDistanseToEarth: true,
        sortByDistanseToMoon: false
    }
    countOfScroll = 0


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.asteroidData.length) {
            if (((this.props.dangerousAsteroidData.length - prevProps.dangerousAsteroidData.length) < 2) && this.props.emptyDangerousDataCount) {
                this.props.toogleApiIsPending(true)
                this.getAsteroids()
                this.props.setEmptyDangerousDataCount(false)
            }

        }
        if ((this.props.asteroidData.length) &&
            (prevState.asteroidField.length != this.props.asteroidData
                    .length ||
                prevProps.asteroidData[prevProps.asteroidData.length - 1].id !=
                this.props.asteroidData[this.props.asteroidData.length -
                1].id || prevState.dangerousSort != this.state
                    .dangerousSort) || prevState.sortByDistanseToMoon != this.state.sortByDistanseToMoon) {
            this.setState({
                asteroidField: this.props.asteroidData.sort(function (a, b) {
                    if ((a.estimated_diameter.meters.estimated_diameter_max + a.estimated_diameter.meters.estimated_diameter_min) > (b.estimated_diameter.meters.estimated_diameter_max + b.estimated_diameter.meters.estimated_diameter_min)) {
                        return 1
                    }
                    if ((a.estimated_diameter.meters.estimated_diameter_max + a.estimated_diameter.meters.estimated_diameter_min) < (b.estimated_diameter.meters.estimated_diameter_max + b.estimated_diameter.meters.estimated_diameter_min)) {
                        return -1
                    }
                    return 0
                }).map(el => {
                        if (this.state.sortByDistanseToEarth) {
                            return this.asteroidComponentMapOnDataSortByDistanseToEarth(el)
                        } else {
                            return this.asteroidComponentMapOnDataSortByDistanseToMoon(el)
                        }
                    }
                ),
                dangerousAsteroidField: this.props.dangerousAsteroidData.sort(function (a, b) {
                    if ((a.estimated_diameter.meters.estimated_diameter_max + a.estimated_diameter.meters.estimated_diameter_min) > (b.estimated_diameter.meters.estimated_diameter_max + b.estimated_diameter.meters.estimated_diameter_min)) {
                        return 1
                    }
                    if ((a.estimated_diameter.meters.estimated_diameter_max + a.estimated_diameter.meters.estimated_diameter_min) < (b.estimated_diameter.meters.estimated_diameter_max + b.estimated_diameter.meters.estimated_diameter_min)) {
                        return -1
                    }
                    return 0
                }).map(el => {
                    if (this.state.sortByDistanseToEarth) {
                        return this.asteroidComponentMapOnDataSortByDistanseToEarth(el)
                    } else {
                        return this.asteroidComponentMapOnDataSortByDistanseToMoon(el)
                    }
                })
            })
        }
        console.log(prevState)
        console.log(this.props)
    }

    render() {
        window.addEventListener("scroll", this.getAsteroidsByScroll)
        console.log(this.state.asteroidField)
        return (
            <div>
                {/*{this.props.requestIsPending ? <Preloader/> : ""}*/}
                <Preloader/>
                <div>
                    <input type={"checkbox"} onChange={() => {
                        {
                            this.state.dangerousSort == null ? this.setState({dangerousSort: true}) : this.state
                                .dangerousSort === true ? this.setState({dangerousSort: false}) : this.setState
                            ({dangerousSort: true})
                        }
                    }}/>Sort by dangerous
                    {/*<button onClick={() => {*/}
                    {/*    this.getAsteroids()*/}
                    {/*}}>Getget</button>*/}
                    <div className={s.sortByDistanseBox}>
                        <input className={s.sortByDistanse} checked={this.state.sortByDistanseToEarth ? true : false}
                               onChange={() => {
                                   if (this.state.sortByDistanseToEarth) {
                                       this.setState({
                                           sortByDistanseToEarth: false,
                                           sortByDistanseToMoon: true
                                       })
                                   } else {
                                       this.setState({
                                           sortByDistanseToEarth: true,
                                           sortByDistanseToMoon: false
                                       })
                                   }
                               }} type="radio" name={"sortByDistanse"} id={"forEarth"}/>
                        <label htmlFor="forEarth">До земли</label>
                    </div>
                    <div className={s.sortByDistanseBox}>
                        <input className={s.sortByDistanse} checked={this.state.sortByDistanseToMoon ? true : false}
                               onChange={() => {
                                   if (this.state.sortByDistanseToMoon) {
                                       this.setState({
                                           sortByDistanseToMoon: false,
                                           sortByDistanseToEarth: true
                                       })
                                   } else {
                                       this.setState({
                                           sortByDistanseToMoon: true,
                                           sortByDistanseToEarth: false
                                       })
                                   }
                               }} type="radio" name={"sortByDistanse"} id={"forMoon"}/>
                        <label htmlFor="forMoon">До луны</label>
                    </div>
                </div>
                {this.state.dangerousSort ? this.state.dangerousAsteroidField : this.props.asteroidData.length ? this.state.asteroidField : "None"}
            </div>)
    }
}

let mapStateToProps = (state) => {
    return {
        asteroidData: state.Asteroids.asteroidData,
        now: state.Asteroids.now,
        maxToMinSizeSort: state.Asteroids.maxToMinSizeSort,
        dangerousSort: state.Asteroids.dangerousSort,
        dangerousAsteroidData: state.Asteroids.dangerousAsteroidData,
        requestIsPending: state.Asteroids.requestIsPending,
        statusOfLoadingData: state.Asteroids.statusOfLoadingData,
        emptyDangerousDataCount: state.Asteroids.emptyDangerousDataCount
    }
}

window.Asteroids = Asteroids
export default connect(mapStateToProps, {
    setHouseData,
    toogleStatusOfLoadingData,
    setEmptyDangerousDataCount,
    toogleApiIsPending
})(Asteroids)