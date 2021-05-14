import { Link, NavLink } from 'react-router-dom'

const Header = () => {
    return(
        <header>
            <div className="contenedor-logo">
                <Link to="/">
                    <img alt="logo" className="logo" src='/assets/logo.png'></img>
                </Link>
            </div>
                
            {/* <div className="contenedorEnlaces flex flex-end">
                <NavLink className="link titulosAlt mx-1" to="/nosotros">Nosotros</NavLink>
                <NavLink className="link titulosAlt mx-1" to="/ingresar">Ingresar</NavLink>
                <NavLink className="link titulosAlt mx-1" to="/registrarse">Registrarse</NavLink>
            </div> */}
            
            <>
                <div className="contenedor-buscador">
                    <input id="buscador" className="titulosAlt" type="text" placeholder="Buscar dentro de categoría"></input>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-175 notificacionesCampana" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </div>

                <div className="flex div-crear-review-user">
                    <Link to="/publicar">
                        <span className="mx-1 btn-crearReview"><b>+</b>Crear review</span>
                    </Link>
                    {/* <span><b>+</b>Ser creador</span> */}
                    <div className="flex flex-col">
                        <div className="usuarioPic mx-auto"></div>
                        {/* <span>Hi there!</span> */}
                    </div>
                </div>
            </>

        </header>
  )
}


   
export default Header