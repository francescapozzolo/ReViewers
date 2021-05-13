import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import authActions from '../redux/actions/authActions'
import InicioSesion from './auth/InicioSesion'
import Registro from './auth/Registro'

const Header = (props) => {
    return(
        <header>
            <div>
                <img alt="logo" className="logo mx-2" src='/assets/logo.png'></img>
            </div>
            
            {
            !props.usuarioLogeado
                ?<div className="contenedorEnlaces flex flex-end">
                <NavLink className="link titulosAlt mx-1" to="/nosotros">Nosotros</NavLink>
                <InicioSesion />
                <Registro />
            </div> 
            : <>
                <div>
                    <input id="buscador" className="titulosAlt" type="text" placeholder="Buscar dentro de categoría"></input>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-175 notificacionesCampana" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    
                </div>
                <div className="flex flex-end mx-2">
             
                    
                <span className="mx-1 btn-crearReview">Crear review</span>
                    <span onClick={props.cerrarSesion} className="mx-1 btn-crearReview">Cerrar sesion</span>                  
                    <div className="">
                        <div className="usuarioPic mx-auto" style={{
                            backgroundImage: `url(${props.usuarioLogeado && props.usuarioLogeado.imagen})`
                        }}></div>
                    </div>
                </div>
            </>
            }

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