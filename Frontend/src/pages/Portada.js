import React from "react";
import Registro from '../components/auth/Registro'
import InicioSesion from '../components/auth/InicioSesion'

class Portada extends React.Component {
  render() {
    return (
      <>
        <h1>soy el texto que iria abajo</h1>
          <InicioSesion />
      </>
    );
  }
}

export default Portada;