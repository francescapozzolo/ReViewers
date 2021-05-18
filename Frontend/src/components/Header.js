import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import authActions from '../redux/actions/authActions'
import CompletarRegistro from './auth/CompletarRegistro'
import InicioSesion from './auth/InicioSesion'
import Registro from './auth/Registro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeatherAlt} from '@fortawesome/free-solid-svg-icons'
import sideBarActions from '../redux/actions/sideBarActions'
import { useEffect } from 'react'
import publicacionesActions from '../redux/actions/publicacionesActions'

const Header = (props) => {

    useEffect(() => {
        const fetch = async () => {
            await props.obtenerTodasPublicaciones()
        }
        fetch()
         // eslint-disable-next-line 
    }, [props.menuOpen])

    return(
        <header>
            <nav>
                <div className="cajaLogo" style={{marginLeft: "calc(1rem + 24px)"}}>
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
        usuarioLogeado: state.authReducer.usuarioLogeado,
        menuOpen: state.sideBarReducer.menuOpen
    }
}
   
const mapDispatchToProps = {
    cerrarSesion: authActions.cerrarSesion,
    changeState: sideBarActions.changeState,
    obtenerTodasPublicaciones: publicacionesActions.obtenerTodasPublicaciones
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)