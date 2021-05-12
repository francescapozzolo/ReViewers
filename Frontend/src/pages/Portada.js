import React from "react";
import Carrusel from "../components/Carrusel";
import Registro from '../components/auth/Registro'
import InicioSesion from '../components/auth/InicioSesion'

class Portada extends React.Component {
  render() {
    return (
      <>
        {/* <Carrusel /> */}
        <InicioSesion />
        <Registro />
      </>
    );
  }
}

export default Portada;