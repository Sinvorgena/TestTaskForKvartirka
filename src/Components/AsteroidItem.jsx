import React from "react";
import {withRouter} from "react-router";
import {Api} from "../Dal/api";
import s from "./AsteroidItem.module.css";
import dino from "../dino.png";
import {compose} from "redux";
import {connect} from "react-redux";
import {
    addAsteroidToDestroy,
    setCurrentAppPage, setHouseData,
} from "../Redux/AsteroidReducer";
import Preloader from "./Preloader";


class AsteroidItem extends React.Component {
    componentDidMount() {
        Api.Asteroid.getConcreteAsteroid(this.props.match.params.userId).then((response) => {
            this.setState({
                el: response.data,
                selectedToDestroy: this.props.asteroidToDestroyData.
                find(el => el.id == this.props.match.params.userId)
            })
        })
        console.log(this.props)
        if (this.props.asteroidData.length == 0) {
            this.startWith = this.getCurrentFormatDate()
            console.log(this.startWith)
            this.addDayToDate(1)
            this.endWith = this.getCurrentFormatDate()
            console.log(this.endWith)
            this.props.setHouseData(this.startWith, this.endWith, true)
            this.startWith = this.getCurrentFormatDate()
            console.log(this.startWith)
            this.addDayToDate(1)
            this.endWith = this.getCurrentFormatDate()
            console.log(this.endWith)
            this.props.setHouseData(this.startWith, this.endWith, true)
            this.startWith = this.getCurrentFormatDate()
            console.log(this.startWith)
            this.addDayToDate(1)
            this.endWith = this.getCurrentFormatDate()
            console.log(this.endWith)
            this.props.setHouseData(this.startWith, this.endWith, true)
            this.startWith = this.getCurrentFormatDate()
            console.log(this.startWith)
            this.addDayToDate(1)
            this.endWith = this.getCurrentFormatDate()
            console.log(this.endWith)
            this.props.setHouseData(this.startWith, this.endWith, true)
            this.startWith = this.getCurrentFormatDate()
            console.log(this.startWith)
            this.addDayToDate(1)
            this.endWith = this.getCurrentFormatDate()
            console.log(this.endWith)
            this.props.setHouseData(this.startWith, this.endWith, true)
            this.startWith = this.getCurrentFormatDate()
            console.log(this.startWith)
            this.addDayToDate(1)
            this.endWith = this.getCurrentFormatDate()
            console.log(this.endWith)
            this.props.setHouseData(this.startWith, this.endWith, true)
            this.startWith = this.getCurrentFormatDate()
            console.log(this.startWith)
            this.addDayToDate(1)
            this.endWith = this.getCurrentFormatDate()
            console.log(this.endWith)
            this.props.setHouseData(this.startWith, this.endWith, true)
        }
        this.props.setCurrentAppPage("Asteroid")

    }
    asteroidItemComponent = ()=>{

        return(
            <div
                className={this.state.el.is_potentially_hazardous_asteroid ? `${s.DangerousAsteroidBakcground} ${s.AsteroidBackgroud}` : `${s.SaftiAsteroidBakcground} ${s.AsteroidBackgroud}`}>
                <div className={s.AsteroidBox} id={this.state.el.id}
                     style={{backgroundSize: `${(((this.state.el.estimated_diameter.meters.estimated_diameter_max + this.state.el.estimated_diameter.meters.estimated_diameter_min) / 2) / 75) * 10}%`}}>
                    <div className={s.imageBox}><img src={dino} alt=""/></div>
                    <div className={s.asteroidInfo}>
                        <p className={s.name}>
                            {this.state.el.designation.slice(this.state.el.designation.indexOf("(") + 1,
                                this.state.el.designation.length - 1)}
                        </p>
                        <p className={s.testBorder}>
                            <span className={s.test1}>Размер</span>
                            <span className={s.test2}></span>
                            <span
                                className={s.test3}>{Math.ceil((this.state.el.estimated_diameter.meters.estimated_diameter_max + this.state.el.estimated_diameter.meters.estimated_diameter_min) / 2)} м</span>
                        </p>
                        <p className={`${s.testBorder} ${s.Border}`}>
                            <span className={s.mainProperty1}>Сближения</span>
                            <span className={s.mainProperty2}></span>
                            <span className={s.mainProperty3}>{this.state.el.close_approach_data.map((el) =>
                                <ul>
                                    <li className={s.testBorder}><span className={s.test1}>Дата сближения</span><span
                                        className={s.test2}></span><span
                                        className={s.test3}>{el.close_approach_date_full}</span></li>
                                    <li className={s.testBorder}><span
                                        className={s.test1}>Скорость сближения</span><span
                                        className={s.test2}></span><span
                                        className={s.test3}>{new Intl.NumberFormat('ru-RU').format(Math.ceil(el.relative_velocity.kilometers_per_hour))} км/ч</span>
                                    </li>
                                    <li className={s.testBorder}><span
                                        className={s.test1}>Расстояние до земли</span><span
                                        className={s.test2}></span><span
                                        className={s.test3}>{new Intl.NumberFormat('ru-RU').format(Math.ceil(el
                                        .miss_distance
                                        .kilometers))} км</span></li>
                                    <li className={s.testBorder}><span
                                        className={s.test1}>Расстояние до луны</span><span
                                        className={s.test2}></span><span
                                        className={s.test3}>{new Intl.NumberFormat('ru-RU').format(Math.ceil(el
                                        .miss_distance
                                        .lunar))} км</span></li>
                                    <li className={s.testBorder}><span className={s.test1}>Орбита</span><span
                                        className={s.test2}></span><span
                                        className={s.test3}>{el.orbiting_body}</span></li>
                                </ul>)}
                                </span>
                        </p>
                    </div>
                    <div className={s.destroyedBox}>
                        <p>Оценка:
                            <p style={{fontWeight: 700}}>{this.state.el.is_potentially_hazardous_asteroid ? "опасен" : "не опасен"}</p>
                        </p>
                        <button
                            className={this.state.selectedToDestroy?`${s.btnToDestroyAsteroidSelecter}`:`${s.btnToDestroyAsteroid}`}
                            onClick={(e) => {
                                if(this.state.selectedToDestroy == undefined){
                                    e.currentTarget.classList.remove(`${s.btnToDestroyAsteroid}`)
                                    e.currentTarget.classList.add(`${s.btnToDestroyAsteroidSelecter}`)
                                    e.currentTarget.innerHTML = "Убрать из уничтожения"
                                } else{
                                    e.currentTarget.classList.remove(`${s.btnToDestroyAsteroidSelecter}`)
                                    e.currentTarget.classList.add(`${s.btnToDestroyAsteroid}`)
                                    e.currentTarget.innerHTML = "На уничтожение"
                                }
                                this.props.addAsteroidToDestroy(this.state.el)
                                this.setState({
                                    selectedToDestroy: this.props.asteroidToDestroyData.
                                    find(el => el.id == this.props.match.params.userId),
                                    AsteroidItemBox: this.asteroidItemComponent()
                                })
                            }}>
                            {this.state.selectedToDestroy ? "Убрать из уничтожения" : "На уничтожение"}
                        </button>
                    </div>
                </div>
            </div>
        )
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("PREV STATE")
        console.log(prevState)
        console.log("NEW STATE")
        console.log(this.state)
        console.log("PREV PROPS")
        console.log(prevProps)
        console.log("NEW PROPS")
        console.log(this.props)
        // if(prevState.asteroidToDestroyData.length != this.props.asteroidToDestroyData.length){
        //     this.setState({
        //         asteroidToDestroyData: this.props.asteroidToDestroyData
        //     })
        // }
        if(prevState.asteroidToDestroyData.length != this.state.asteroidToDestroyData.length || prevState.el.id != this.state.el.id || prevState.asteroidToDestroyData.length != this.props.asteroidToDestroyData.length){
            this.setState({
                selectedToDestroy: this.props.asteroidToDestroyData.
                find(el => el.id == this.props.match.params.userId),
                asteroidToDestroyData: this.props.asteroidToDestroyData,
                AsteroidItemBox: this.asteroidItemComponent(),

            })
        }
        if(prevProps.asteroidData.length!=this.props.asteroidData.length ){
            Api.Asteroid.getConcreteAsteroid(this.props.match.params.userId).then((response) => {
                this.setState({
                    el: response.data,
                    selectedToDestroy: this.props.asteroidToDestroyData.
                    find(el => el.id == this.props.match.params.userId)
                })
            })
        }
    }

    state = {
        el: {},
        AsteroidItemBox: "",
        asteroidToDestroyData: this.props.asteroidToDestroyData,
        selectedToDestroy: undefined
    }

    render() {
        return (
            <div>
                {this.props.requestIsPending ? <Preloader/> : ""}
                {this.state.AsteroidItemBox}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentAppPage: state.Asteroids.currentAppPage,
        asteroidData: state.Asteroids.asteroidData,
        asteroidToDestroyData: state.Asteroids.asteroidToDestroyData,
        requestIsPending: state.Asteroids.requestIsPending
    }
}

export default compose(
    connect(mapStateToProps, {
        setCurrentAppPage,
        addAsteroidToDestroy,
        setHouseData,

    }),
    withRouter,
)(AsteroidItem);