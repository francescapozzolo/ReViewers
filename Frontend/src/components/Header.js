import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import authActions from '../redux/actions/authActions'
import CompletarRegistro from './auth/CompletarRegistro'
import InicioSesion from './auth/InicioSesion'
import Registro from './auth/Registro'

const Header = (props) => {
    return(
        <header>
            <nav>
                <div>
                    <Link to="/">
                        <img alt="logo" className="logo" src='/assets/logo.png'></img>
                    </Link>
                </div>
                
                {
                !props.usuarioLogeado
                ? <div className="contenedorEnlaces flex flex-end">
                    <NavLink className="link titulosAlt mx-1" to="/nosotros">Nosotros</NavLink>
                    <InicioSesion />
                    <CompletarRegistro />
                    <Registro />
                </div> 
                : <>
                    <div className="contenedorUsuarioHeader">            
                        <Link to="/publicar">
                            <span className="btn-crearReview texto">Crear review</span>
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