import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import authActions from '../redux/actions/authActions'
import CompletarRegistro from './auth/CompletarRegistro'
import InicioSesion from './auth/InicioSesion'
import Registro from './auth/Registro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faHome, faFeatherAlt, faBookOpen, faUserCog, faStar } from '@fortawesome/free-solid-svg-icons'

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
                    {/* <InicioSesion /> */}
                    {/* <Registro /> */} 
                </div> 
                : <>
                    <div className="contenedorUsuarioHeader">
                        {
                            !props.usuarioLogeado.usuarioConfirmado && <CompletarRegistro />
                        }
                        <Link to="/publicar">
                            <span className="btn-crearReview texto"><FontAwesomeIcon icon={faFeatherAlt}/> Crear review</span>
                        </Link> 
                        <span onClick={props.cerrarSesion} className="mx-1 btn-crearReview texto">Cerrar sesion</span>                  

                        <div className="">
                            <div className="usuarioPic mx-auto" style={{
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
    cerrarSesion: authActions.cerrarSesion
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)