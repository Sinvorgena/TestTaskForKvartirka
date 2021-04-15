import s from "./App.module.css"
import {Api} from './Dal/api';
import Asteroids from "./Components/Asteroids";
import Footer from "./Components/Footer";
import AsteroidItem from "./Components/AsteroidItem";
import {NavLink, Route} from "react-router-dom";
import React from "react";
import AsteroidsBasket from "./Components/AsteroidsBasket";

function App() {
  return (
    <div className={s.App}>
        <div className={s.Header}>
            <p className={s.HeaderLabel}>ARMAGGEDON V</p>
            <p className={s.HeaderText}>Сервис мониторинга и уничтожения астероидов, опасно подлетающих к Земле.</p>
            <div className={s.switchPageBox}>
                <NavLink to={"/Asteroids"} activeClassName={s.NavLinkActive}>Астероиды</NavLink>
                <NavLink to={"/AsteroidsBasket"} activeClassName={s.NavLinkActive}>Уничтожение</NavLink>
            </div>
        </div>
        <Route path={"/Asteroids"} render={() =>
            <Asteroids/>}
        />
        <div className={s.footer}><Footer/></div>
        <Route path={"/Asteroid/:userId?"} render={() =>
            <AsteroidItem/>}
        />
        <Route path={"/AsteroidsBasket"} render={() =>
            <AsteroidsBasket/>}
        />
    </div>
  );
}

export default App;
