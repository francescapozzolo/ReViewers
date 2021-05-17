import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import authActions from '../redux/actions/authActions'
import CompletarRegistro from './auth/CompletarRegistro'
import InicioSesion from './auth/InicioSesion'
import Registro from './auth/Registro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {  faHome, faFeatherAlt, faBookOpen, faUserCog, faStar } from '@fortawesome/free-solid-svg-icons'
import { faFeatherAlt} from '@fortawesome/free-solid-svg-icons'
import sideBarActions from '../redux/actions/sideBarActions'

const Header = (props) => {
    return(
        <header>
            <nav>
                <div style={{marginLeft: "calc(1rem + 24px)"}}>
                    <Link to="/">
                        <img alt="logo" className="logo" src='/assets/logo.png'></img>
                    </Link>
                </div>
               

                {
                !props.usuarioLogeado 
                ? <div className="contenedorEnlaces flex flex-end">
                    <InicioSesion />
                    <Registro />
                </div> 
                : <>
                    <div className="contenedorUsuarioHeader">
                        {
                            !props.usuarioLogeado.usuarioConfirmado && <CompletarRegistro />
                        }
                        {
                            props.usuarioLogeado && props.usuarioLogeado.rol === "escritor" ?
                            <Link to="/publicar" className="link texto" >
                                <span className="btn-crearReview texto">
                                    <FontAwesomeIcon style={{color:'blueviolet', marginRight:'5px'}} icon={faFeatherAlt}/> 
                                    Crear review
                                    </span>
                            </Link> 
                            :  <div className="contenedorEnlaces flex flex-end">
                                    <Link to="/" className="link texto">
                                        Inicio
                                    </Link>
                                </div> 
                        }
                        <div className="contenedor-usuarioPic">
                            <div className="usuarioPic mx-auto" onClick={props.changeState} style={{
                                backgroundImage: `url(${props.usuarioLogeado && props.usuarioLogeado.imagen})`
                            }}></div>
                        </div>

                    </div>
                </>
                }
            </nav>
        </header>
  )
}


const mapStateToProps = state => {
    return{
        usuarioLogeado: state.authReducer.usuarioLogeado
    }
}
   
const mapDispatchToProps = {
    cerrarSesion: authActions.cerrarSesion,

    changeState: sideBarActions.changeState
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)