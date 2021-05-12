import { Link, NavLink } from 'react-router-dom'

const Header = () => {
    return(
        <header>
            <div>
                <img alt="logo" className="logo" src='/assets/logo.png'></img>
                <div className="contenedorEnlaces">
                    <NavLink className="link titulosAlt" to="/nosotros">Nosotros</NavLink>
                    <NavLink className="link titulosAlt" to="/ingresar">Ingresar</NavLink>
                    <NavLink className="link titulosAlt" to="/registrarse">Registrarse</NavLink>
                </div>
            </div>
            {/* <div>
                <div id="logoHeader"></div>
                <input id="buscador" className="titulosAlt" type="text" placeholder="Buscar dentro de categoría"></input>
                <div className="usuarioPic"></div>
            </div> */}
        </header>
  )
}


   
export default Header