import loaderSvg from "../1476.png"
import cosmoBack from "../cosmos-background.jpg"
import s from "./Preloader.module.css"
import {connect} from "react-redux";


const Preloader = (props) => {
    return (
        <>
            {props.requestIsPending ? <div className={s.PreloaderBox}>
                <div className={s.PreloaderBackground}></div>
                <div
                    className={s.PreloaderImgBox}
                    style={{backgroundImage: `url(${cosmoBack})`}}><img src={loaderSvg} alt=""/></div>
            </div> : ""}
        </>
    )

}
let mapStateToProps = state => {
    return {
        requestIsPending: state.Asteroids.requestIsPending
    }
}
export default connect(mapStateToProps, {})(Preloader)