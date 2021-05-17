import React, { createRef } from "react";
import { connect } from "react-redux";
// import publicacionesActions from "../redux/actions/publicacionesActions";
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import { toast } from "react-toastify";
import { Icon } from '@iconify/react';
import editIcon from '@iconify-icons/carbon/edit';
import imageEditLine from '@iconify-icons/ri/image-edit-line';
import checkmarkCircleOutline from '@iconify-icons/eva/checkmark-circle-outline';
import authActions from "../redux/actions/authActions";


const Imagen = styled.div`
  & {
    width: 100%;
    height: 64.5%;
    position: relative;
    border-radius: 10px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${(props) => props.imagen.imagen ? props.imagen.imagen : props.imagen});
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


class Configuraciones extends React.Component {
  state = {
    valoresInput: {
      nombre:{nombre:"",disabled:true},
      apellido:{apellido:"",disabled:true},
      mail: {mail:"",disabled:true},
      clave: {clave:"",disabled:true},
      claveNueva: {claveNueva:""},
      imagen: {imagen:"",disabled:true},
      intereses: [],
      rol:"lector"
    },
  };

  inputImagen = createRef()

  setearInput = (e) => {
    const valueInput = e.target.value;
    const campoInput = e.target.name;
    this.setState({
      ...this.state,
      valoresInput: {
        ...this.state.valoresInput,
        [campoInput]:{...this.state.valoresInput[campoInput], [campoInput]:valueInput},
      },
    });
  };
  setearIntereses = (e) => {
    const valueInput = e.target.value;
    if(!this.state.valoresInput.intereses.find(interes=> interes === valueInput)){ 
      this.setState({
        ...this.state,
        valoresInput: {
          ...this.state.valoresInput,
          intereses: [...this.state.valoresInput.intereses,valueInput]
        },
      });
    }else{
      this.setState({
        ...this.state,
        valoresInput: {
          ...this.state.valoresInput,
          intereses: this.state.valoresInput.intereses.filter(interes => interes !== valueInput)
        },
      });
    }
  };
  setearCreador = (e)=>{
    this.setState({
      ...this.state,
      valoresInput:{...this.state.valoresInput, rol:e.target.checked ? "escritor" : "lector"}})
  }
  editarCampo = (e)=>{
    e.preventDefault()
    const campo = e.target.dataset.campo
    if(campo){
      const disabled = this.state.valoresInput[campo].disabled
      this.setState({
        ...this.state,
        valoresInput:{
          ...this.state.valoresInput,
          [campo]:{...this.state.valoresInput[campo], disabled:!disabled}
        }
      })
    }
  }

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
  enviarForm = async (e) => {
    e.preventDefault();
    let nombre = this.state.valoresInput.nombre.nombre.trim()
    let apellido = this.state.valoresInput.apellido.apellido.trim()
    let mail = this.state.valoresInput.mail.mail.trim()
    let imagen = this.state.valoresInput.imagen.imagen.trim()
    let clave = this.state.valoresInput.clave.clave.trim()
    let claveNueva = this.state.valoresInput.claveNueva.claveNueva.trim()
    let rol = this.state.valoresInput.rol
    let intereses = this.state.valoresInput.intereses

    const datos = {nombre,apellido,mail,clave,claveNueva,imagen,rol,intereses}
    const respuesta = await this.props.actualizarDatos(datos)

  };

  
  render() {

    if(!this.props.usuarioLogeado){
      return null
    }
    // console.log(this.props);
    return (
      <main className="contenedor">
        <form className="contenedor-reseña">
          <div className="contenedor-inputs-selects-textarea">
            <div className="formulario-configuraciones">

              <div className="contenedor-inputs-externo-configuraciones">
                <div className="contenedor-inputs-interno-configuraciones">
                  <label
                    data-campo="nombre" onClick={this.editarCampo} 
                    htmlFor="input-nombre"
                    className="label-subtitulo-titulo titulosAlt"
                  >
                    Nuevo nombre
                    <div data-campo="nombre" onClick={this.editarCampo} >
                    { <Icon  className="edit-form-config" data-campo="nombre" icon={ this.state.valoresInput.nombre.disabled ? editIcon : checkmarkCircleOutline}/>}
                    {/* <Icon icon={} /> */}
                    </div>

                  </label>
                  <Tooltip  title={!this.state.valoresInput.nombre.disabled ? "Su nuevo nombre" : "Presione el icono para editar"} placement="top-end">
                    <input
                      value={this.state.valoresInput.nombre.nombre}
                      type="text"
                      placeholder="Nombre"
                      autoComplete="off"
                      name="nombre"
                      onChange={this.setearInput}
                      className="input-text"
                      id="input-nombre"
                      disabled={this.state.valoresInput.nombre.disabled}
                    />
                  </Tooltip>
                </div>
                <div className="contenedor-inputs-interno-configuraciones">
                  <label
                    onClick={this.editarCampo} data-campo="apellido"
                    htmlFor="input-apellido"
                    className="label-subtitulo-titulo titulosAlt"
                  >
                    Nuevo apellido
                    <div onClick={this.editarCampo} data-campo="apellido">
                    <Icon  data-campo="apellido" className="edit-form-config" icon={this.state.valoresInput.apellido.disabled ? editIcon : checkmarkCircleOutline}/>
                    </div>
                  </label>
                  <Tooltip  title={!this.state.valoresInput.apellido.disabled ? "Su nuevo apellido" : "Presione el icono para editar"} placement="top-end">
                    <input
                      value={this.state.valoresInput.apellido.apellido}
                      type="text"
                      placeholder="Apellido"
                      autoComplete="off"
                      name="apellido"
                      onChange={this.setearInput}
                      className="input-text"
                      id="input-apellido"
                      disabled={this.state.valoresInput.apellido.disabled}
                    />
                  </Tooltip>
                </div>
              </div>
              <div className="contenedor-inputs-externo-configuraciones">
                <div className="contenedor-inputs-interno-configuraciones" style={{width:'100%'}}>
                  <label
                    onClick={this.editarCampo} data-campo="mail"
                    htmlFor="input-mail"
                    className="label-subtitulo-titulo titulosAlt"
                  >
                    Nuevo email
                    <div onClick={this.editarCampo} data-campo="mail">
                    <Icon data-campo="mail" className="edit-form-config" icon={this.state.valoresInput.mail.disabled ? editIcon : checkmarkCircleOutline}/>
                    </div>
                  </label>
                  <Tooltip  title={!this.state.valoresInput.mail.disabled ? "Su nuevo Email" : "Presione el icono para editar"} placement="top-end">
                    <input
                      value={this.state.valoresInput.mail.mail}
                      type="text"
                      placeholder="Email"
                      autoComplete="off"
                      name="mail"
                      onChange={this.setearInput}
                      className="input-text"
                      id="input-mail"
                      style={{width:'100%'}}
                      disabled={this.state.valoresInput.mail.disabled}
                    />
                  </Tooltip>
                </div>
              </div>
              <div className="contenedor-inputs-externo-configuraciones">
                <div className="contenedor-inputs-interno-configuraciones" style={this.state.valoresInput.clave.disabled ? {width:'100%'} : null}>
                  <label
                    onClick={this.editarCampo} data-campo="clave"
                    htmlFor="input-claveActual"
                    className="label-subtitulo-titulo titulosAlt"
                  >
                    {!this.state.valoresInput.clave.disabled ?
                      "Clave actual" 
                      :
                      <> Cambiar clave 
                        <div onClick={this.editarCampo} data-campo="clave">
                          <Icon  data-campo="clave" className="edit-form-config" icon={this.state.valoresInput.clave.disabled ? editIcon : checkmarkCircleOutline}/>
                        </div>
                      </>
                    }

                  </label>
                  <Tooltip  title={!this.state.valoresInput.clave.disabled ? "Su clave actual" : "Presione el icono para editar"} placement="top-end">
                    <input
                      value={this.state.valoresInput.claveActual}
                      type="password"
                      placeholder="Clave"
                      autoComplete="off"
                      name="clave"
                      onChange={this.setearInput}
                      className="input-text"
                      id="input-claveActual"
                      disabled={this.state.valoresInput.clave.disabled}
                    />
                  </Tooltip>
                </div>
                {
                  this.state.valoresInput.clave.disabled ? null :

                <div className="contenedor-inputs-interno-configuraciones">
                  <label
                  style={{cursor:'inherit'}}
                    htmlFor="input-claveNueva"
                    className="label-subtitulo-titulo titulosAlt"
                  >
                    Clave nueva
                  </label>
                  <Tooltip arrow title="Su nueva clave" placement="top-end">
                    <input
                      value={this.state.valoresInput.claveNueva.claveNueva}
                      type="password"
                      placeholder="Nueva clave"
                      autoComplete="off"
                      name="claveNueva"
                      onChange={this.setearInput}
                      className="input-text"
                      id="input-claveNueva"
                      disabled={this.state.valoresInput.clave.disabled}
                      />
                  </Tooltip>
                </div>
                }
              </div>
              <div className="contenedor-inputs-externo-configuraciones">
                  <Tooltip                    
                    title="Aqui puede seleccionar sus temas de interés"
                    placement="top-start"
                  >
                  <label
                    className="label-subtitulo-titulo titulosAlt"
                    style={{width:'100%'}}
                  >
                  Intereses:
                  </label>               
                  </Tooltip>
                <div className="contenedor-inputs-interno-checkbox-configuraciones">
                  <div className="input-checkbox-configuraciones">
                    
                    <input
                      type="checkbox"
                      value={"gastronomia"}
                      name={"intereses"}
                      id="gastronomia"
                      onChange={this.setearIntereses}
                      /> <label htmlFor="gastronomia">Gastronomia</label>
                  </div>
                    
                  <div className="input-checkbox-configuraciones">
                    <input
                      type="checkbox"
                      value={"deportes"}
                      name={"intereses"}
                      id="deportes"
                      onChange={this.setearIntereses}
                      /> <label htmlFor="deportes">Deportes</label>
                    </div>

                  <div className="input-checkbox-configuraciones">
                    <input
                      type="checkbox"
                      value={"rol"}
                      name="rol"
                      id="rol"
                      onChange={this.setearCreador}
                      /> <label htmlFor="rol">Ser creador de contenido?</label>
                    </div>

                
                  </div>
                <div className="contenedor-inputs-interno-checkbox-configuraciones">
                  <div className="input-checkbox-configuraciones">
                    <input
                      type="checkbox"
                      value={"entretenimiento"}
                      name={"intereses"}
                      id="entretenimiento"
                      autoComplete="off"
                      onChange={this.setearIntereses}
                      /> <label htmlFor="entretenimiento">Entretenimiento</label>
                    </div>
                  <div className="input-checkbox-configuraciones">
                    <input
                      type="checkbox"
                      value={"tecnologia"}
                      name={"intereses"}
                      id="tecnologia"
                      autoComplete="off"
                      onChange={this.setearIntereses}
                      /> <label htmlFor="tecnologia">Tecnologia</label>
                    </div>
                  </div>
              </div>
          </div>
          </div>
          <div className="contenedor-input-foto">
            <div className="contenedor-inputs-externo-configuraciones" >
              <div className="contenedor-inputs-interno-configuraciones" style={{width:'100%'}}>
            <Tooltip                    
                    title={this.state.valoresInput.imagen.disabled ? "Presione el icono para editar" : "Ingrese su nueva imagen"}
                    placement="top-end"
                  >
                  <label
                    onClick={this.editarCampo} data-campo="imagen"
                    className="label-subtitulo-titulo titulosAlt"
                    style={{width:'100%'}}
                  >
                  {<>{ this.state.valoresInput.imagen.disabled ? "Editar imagen" : "Seleccione su imagen"} <div onClick={this.editarCampo} data-campo="imagen"> <Icon data-campo="imagen"  icon={this.state.valoresInput.imagen.disabled ? imageEditLine : checkmarkCircleOutline}/> </div> </>}
                  </label>               
              </Tooltip>
              <Tooltip
                title={this.state.valoresInput.imagen.disabled ? "Presione el icono para editar" : "Ingrese su nueva imagen"}
                placement="top-end"
              >
                <input
                  value={this.state.valoresInput.imagen.imagen}
                  type="text"
                  ref={this.inputImagen}
                  autoComplete="off"
                  name="imagen"
                  onChange={this.setearInput}
                  placeholder="Cambiar imagen de perfil"
                  className="input-text"
                  disabled={this.state.valoresInput.imagen.disabled}
                />
              </Tooltip>
            </div>
            </div>

            {!this.state.valoresInput.imagen.disabled ? (
                <Imagen
                  imagen={this.state.valoresInput.imagen}
                  onClick={() => this.inputImagen.current.focus()}
                />
            ) : (
             // // ACA VA EL USUARIO LOGUEADO DESDE REDUX // // // 
              <Imagen
              imagen={this.props.usuarioLogeado.imagen}
            />
            )}
          </div>
          <div className="contenedor-enviarForm">
            {/* Boton enviar formulario */}
            <Tooltip arrow title="Guardar cambios" placement="bottom">
              <button
                onClick={this.enviarForm}
                data-done={this.state.valoresInput.imagen.length > 12}
                className="boton-postear texto texto-white texto-negrita"
              >
                Guardar
              </button>
            </Tooltip>
          </div>
        </form>

        <div></div>
      </main>
    );
  }
}

const mapStateToProps = state =>{
  return {
    usuarioLogeado: state.authReducer.usuarioLogeado
  }
}
const mapDispatchToProps = {
  actualizarDatos:authActions.actualizarDatosUsuario
}

export default connect(mapStateToProps, mapDispatchToProps)(Configuraciones);
