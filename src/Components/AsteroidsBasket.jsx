import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import s from "./AsteroidsBasket.module.css";
import dino from "../dino.png";
import {NavLink} from "react-router-dom";
import {addAsteroidToDestroy, cleatBasket, setCurrentAppPage} from "../Redux/AsteroidReducer";
import astro from "../1476.png"
import cosmo from "../cosmos-background.jpg"



class AsteroidsBasket extends React.Component {
    componentDidMount() {
        this.props.setCurrentAppPage("AsteroidsBasket")
    }

    AsteroidBasketPopApp = React.createRef()
    state= {
        destroyData: this.props.asteroidToDestroyData.map(el => <div>{el.name}</div>)
    }
    render() {
        return (
            <div className={s.AsteroidBasketPage}>
                <div ref={this.AsteroidBasketPopApp} tabindex="0" autofocus={true} onBlur={()=>{
                    this.AsteroidBasketPopApp.current.classList.remove(`${s.active}`)
                    console.log("fsdfsdfsd")
                }} className={s.AsteroidBasketPopApp}>
                    Бригада выслана на эти астероиды: {this.state.destroyData} Спасибо за доверие.
                </div>
                <div className={s.AsteroidBasketItems}>
                {this.props.asteroidToDestroyData.map(el => {
                    let isAsteroidSelected = this.props.asteroidToDestroyData.find(elem => elem.id == el.id)
                    return (
                        <div
                            className={el.is_potentially_hazardous_asteroid ? `${s.DangerousAsteroidBakcground} ${s.AsteroidBackgroud}` : `${s.SaftiAsteroidBakcground} ${s.AsteroidBackgroud}`}
                        >
                            <div className={s.AsteroidBox} id={el.id}
                                 style={{backgroundSize: `${(((el.estimated_diameter.meters.estimated_diameter_max + el.estimated_diameter.meters.estimated_diameter_min) / 2) / 75) * 10}%`}}>
                                <div className={s.imageBox}><img src={dino} alt=""/></div>
                                <div className={s.asteroidInfo}>
                                    <p>
                                        <NavLink className={s.asteroidName} to={`/Asteroid/${el.id}`}>{el.name.slice(el.name.indexOf("(") + 1,
                                            el.name.length - 1)}</NavLink>
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
                                            .kilometers))} км</span>
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
                                        <p style={{fontWeight: 700}}>{el.is_potentially_hazardous_asteroid ? "опасен" : "не опасен"}</p>
                                    </p>
                                    <button
                                        className={isAsteroidSelected != undefined ? `${s.btnToDestroyAsteroidSelecter}` : `${s.btnToDestroyAsteroid}`}
                                        onClick={() => {
                                            el.selectedToDestoy = !el.selectedToDestoy
                                            this.props.addAsteroidToDestroy(el)
                                            this.setState({})
                                        }
                                        }>{isAsteroidSelected != undefined ? "Убрать из уничтожения" : "На уничтожение"}</button>

                                </div>
                            </div>
                        </div>)
                })}
            </div>
                <div className={s.sendBrigadeBox}><button onClick={()=>{
                    this.props.cleatBasket()
                    console.log(this.AsteroidBasketPopApp.current.classList.add(`${s.active}`));}} style={{backgroundImage: `url(${cosmo})`}} className={s.sendBrigadeBtn}><p>Отправить бригаду</p><img className={s.sendBrigadeImg} src={astro} alt=""/></button></div>
            </div>

        )
    }
}

let mapStateToProps = state => {
    return {
        asteroidToDestroyData: state.Asteroids.asteroidToDestroyData
    }
}
export default compose(
    connect(mapStateToProps, {addAsteroidToDestroy,cleatBasket, setCurrentAppPage})
)(AsteroidsBasket)

