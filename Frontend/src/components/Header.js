import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import authActions from '../redux/actions/authActions'
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
                    ?<div className="contenedorEnlaces flex flex-end">
                    <NavLink className="link titulosAlt mx-1" to="/nosotros">Nosotros</NavLink>
                    <InicioSesion />
                    <Registro />
                </div> 
                : <>
                    <div className="contenedorUsuarioHeader">            
                        <span className="btn-crearReview">Crear review</span>
                        <span onClick={props.cerrarSesion} className="mx-1 btn-crearReview">Cerrar sesion</span>                  
                        <div className="">
                            <div className="usuarioPic mx-auto" style={{
                                backgroundImage: `url(${props.usuarioLogeado && props.usuarioLogeado.imagen})`
                            }}></div>
                        </div>

                    </div>
                </>
                }
            </nav>

            <div className="contenedorBuscador">
                <div className="buscador">
                    <input id="buscador" className="titulosAlt" type="text" placeholder="Buscar dentro de categoría"></input>
                </div>
            </div>

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