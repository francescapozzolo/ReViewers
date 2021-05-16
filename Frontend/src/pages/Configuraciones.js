import React from "react";
import { connect } from "react-redux";
import publicacionesActions from "../redux/actions/publicacionesActions";
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import { toast } from "react-toastify";

const Imagen = styled.div`
  & {
    width: 100%;
    height: 64.5%;
    position: relative;
    border-radius: 10px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${(props) => props.imagen});
    cursor: pointer;
  }
  ${(props) =>
    !props.done
      ? `&:after {
          content: "";
          position: absolute;
          z-index: -1;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          border-radius:20px;
          background-image:url('/assets/imagenNoValida.png');
          background-size:contain;
          background-position:center;
          background-repeat:no-repeat;
        }`
      : null}
`;
const NoImagen = styled.div`
  & {
    width: 30%;
    height: 30%;
    position: relative;
    border-radius: 10px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("/assets/noPic.png");
  }
`;

class Configuraciones extends React.Component {
  state = {
    valoresInput: {
      nombre: "",
      apellido: "",
      mail: "",
      clave: "",
      imagen: "",
      intereses: "",
      rol: "",
      favoritos: "",
      seguidores: "",
      usuarioConfirmado: "",
    },
  };

  setearInput = (e) => {
    const valueInput = e.target.value;
    const campoInput = e.target.name;
    this.setState({
      ...this.state,
      valoresInput: {
        ...this.state.valoresInput,
        [campoInput]: valueInput,
      },
    });
  };

  toasts = (
    tipo,
    mensaje,
    position,
    autoClose,
    closeOnClick,
    pauseOnHover,
    draggable,
    toastId,
    closeButton
  ) => {
    toast[tipo](mensaje, {
      position,
      closeOnClick,
      pauseOnHover,
      draggable,
      toastId,
      closeButton,
      autoClose,
    });
  };

  comprobarImagen = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      comprobarImagen: !this.state.comprobarImagen,
    });
  };

  enviarForm = (e) => {
    e.preventDefault();
  };

  render() {
    console.log(this.state);
    return (
      <main className="contenedor">
        <form className="contenedor-reseña">
          <div className="contenedor-inputs-selects-textarea">
            <div className="formulario-configuraciones">

              <div className="contenedor-inputs-externo-configuraciones">
                <div className="contenedor-inputs-interno-configuraciones">
                  <label
                    htmlFor="input-nombre"
                    className="label-subtitulo-titulo titulosAlt"
                  >
                    Nuevo nombre
                  </label>
                  <Tooltip arrow title="Su nuevo nombre" placement="top">
                    <input
                      value={this.state.valoresInput.nombre}
                      type="text"
                      placeholder="Nombre"
                      autoComplete="off"
                      name="nombre"
                      onChange={this.setearInput}
                      className="input-text"
                      id="input-nombre"
                    />
                  </Tooltip>
                </div>
                <div className="contenedor-inputs-interno-configuraciones">
                  <label
                    htmlFor="input-apellido"
                    className="label-subtitulo-titulo titulosAlt"
                  >
                    Nuevo apellido
                  </label>
                  <Tooltip arrow title="Su nuevo apellido" placement="top-end">
                    <input
                      value={this.state.valoresInput.apellido}
                      type="text"
                      placeholder="Apellido"
                      autoComplete="off"
                      name="apellido"
                      onChange={this.setearInput}
                      className="input-text"
                      id="input-apellido"
                      style={{ alignSelf: "flex-end" }}
                    />
                  </Tooltip>
                </div>
                <div className="contenedor-inputs-interno-configuraciones">
                  <label
                    htmlFor="input-mail"
                    className="label-subtitulo-titulo titulosAlt"
                  >
                    Nuevo email
                  </label>
                  <Tooltip arrow title="Su nuevo Email" placement="top-end">
                    <input
                      value={this.state.valoresInput.mail}
                      type="text"
                      placeholder="Email"
                      autoComplete="off"
                      name="mail"
                      onChange={this.setearInput}
                      className="input-text"
                      id="input-mail"
                      style={{ alignSelf: "flex-end" }}
                    />
                  </Tooltip>
                </div>
                <div className="contenedor-inputs-interno-configuraciones">
                  <label
                    htmlFor="input-claveActual"
                    className="label-subtitulo-titulo titulosAlt"
                  >
                    Clave actual
                  </label>
                  <Tooltip arrow title="Su clave actual" placement="top-end">
                    <input
                      value={this.state.valoresInput.claveActual}
                      type="password"
                      // placeholder="Clave"
                      autoComplete="off"
                      name="clave"
                      onChange={this.setearInput}
                      className="input-text"
                      id="input-claveActual"
                      style={{ alignSelf: "flex-end" }}
                    />
                  </Tooltip>
                </div>
                <div className="contenedor-inputs-interno-configuraciones">
                  <label
                    htmlFor="input-claveNueva"
                    className="label-subtitulo-titulo titulosAlt"
                  >
                    Clave nueva
                  </label>
                  <Tooltip arrow title="Su nueva clave" placement="top-end">
                    <input
                      value={this.state.valoresInput.claveNueva}
                      type="password"
                      placeholder=""
                      autoComplete="off"
                      name="claveNueva"
                      onChange={this.setearInput}
                      className="input-text"
                      id="input-claveNueva"
                      style={{ alignSelf: "flex-end" }}
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
          <div className="contenedor-input-foto">
            <div className="input-imagen-boton-comprobar">
              <Tooltip
                arrow
                title="La imagen de perfil que todos verán"
                placement="top-start"
              >
                <input
                  value={this.state.valoresInput.imagen}
                  type="text"
                  ref={this.ingresarImagen}
                  autoComplete="off"
                  name="imagen"
                  onChange={this.setearInput}
                  placeholder="Cargue su imagen de perfil"
                  className="input-imagen"
                />
              </Tooltip>
              <Tooltip
                title="Compruebe si su imagen se muestra correctamente"
                placement="bottom-start"
              >
                <button
                  onClick={this.comprobarImagen}
                  className="boton-comprobar"
                >
                  {this.state.comprobarImagen
                    ? "Editar Pros / Contras / Tags"
                    : "Comprobar imagen"}
                </button>
              </Tooltip>
            </div>
            {this.state.comprobarImagen ? (
              <Tooltip
                arrow
                title={
                  this.state.valoresInput.imagen.length > 32
                    ? "Imagen de portada"
                    : "Imagen de portada NO VALIDA"
                }
                placement="bottom"
              >
                <Imagen
                  imagen={this.state.valoresInput.imagen}
                  done={this.state.valoresInput.imagen.length > 32}
                  onClick={() => this.ingresarImagen.current.focus()}
                />
              </Tooltip>
            ) : (
              <div className="contenedor-pro-contra-tag">
                <label
                  htmlFor="pro"
                  className="label-subtitulo-titulo titulosAlt label-pro-contra"
                >
                  Pros:
                </label>
                <Tooltip
                  arrow
                  title="Ingrese el/los Pros de lo reseñado separados por una coma ' , '"
                  placement="top-end"
                >
                  <input
                    type="text"
                    value={this.state.valoresInput.pro}
                    id="pro"
                    autoComplete="off"
                    name="pro"
                    onChange={this.setearInput}
                    placeholder="Pros"
                    className="input-imagen"
                  />
                </Tooltip>
                <label
                  htmlFor="contra"
                  className="label-subtitulo-titulo titulosAlt label-pro-contra"
                >
                  Contras:
                </label>
                <Tooltip
                  arrow
                  title="Ingrese el/los Contras de lo reseñado separados por una coma ' , '"
                  placement="top-end"
                >
                  <input
                    type="text"
                    value={this.state.valoresInput.contra}
                    id="contra"
                    autoComplete="off"
                    name="contra"
                    onChange={this.setearInput}
                    placeholder="Contras"
                    className="input-imagen"
                  />
                </Tooltip>
                <label
                  htmlFor="tags"
                  className="label-subtitulo-titulo titulosAlt label-pro-contra"
                >
                  Tags:
                </label>
                <Tooltip
                  arrow
                  title="Ingrese el/los Tags de lo reseñado separados por una coma ' , '"
                  placement="top-end"
                >
                  <input
                    type="text"
                    value={this.state.valoresInput.tags}
                    id="tags"
                    autoComplete="off"
                    name="tags"
                    onChange={this.setearInput}
                    placeholder="Tags"
                    className="input-imagen"
                  />
                </Tooltip>
              </div>
            )}
          </div>
          <div className="contenedor-enviarForm">
            {/* Boton enviar formulario */}
            <Tooltip arrow title="Postear Reseña" placement="bottom">
              <button
                onClick={this.enviarForm}
                data-done={this.state.valoresInput.imagen.length > 12}
                className="boton-postear texto texto-white texto-negrita"
              >
                Postear
              </button>
            </Tooltip>
          </div>
        </form>

        <div></div>
      </main>
    );
  }
}

export default connect(null)(Configuraciones);
