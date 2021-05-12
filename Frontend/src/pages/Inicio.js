import React from 'react'
import { NavLink } from 'react-router-dom';

class Inicio extends React.Component{
    render() {

        return(      
            <main>
                <div className="contenedorLinkCategoria">
                    <NavLink className="link titulosAlt" to="/entretenimientos">Entretenimiento</NavLink>
                    <NavLink className="link titulosAlt" to="/deportes">Deportes</NavLink>
                    <NavLink className="link titulosAlt" to="/gastronomia">Gastronomía</NavLink>
                    <NavLink className="link titulosAlt" to="/tecnologia">Tecnología</NavLink>
                </div>
                <div className="gridInicio">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </main>
        )
    }
}

export default Inicio;
