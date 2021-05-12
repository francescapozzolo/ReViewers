import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {
    return(
        <header>
            <div>
                <div id="logoHeader"></div>
                <input id="buscador" className="titulosAlt" type="text" placeholder="Buscar dentro de categoría"></input>
                <FontAwesomeIcon icon={'coffee-pot'} />
                <div className="usuarioPic"></div>
            </div>
        </header>
  )
}


   
export default Header