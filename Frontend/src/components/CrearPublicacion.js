import React from "react";
import { connect } from "react-redux";
import publicacionesActions from "../redux/actions/publicacionesActions";
import styled from 'styled-components';


    // style={{backgroundImage:`url(${this.state.valoresInput.imagen})`}}


    const Imagen = styled.div`
    & {
        width: 100%;
        height: 64.5%;
        position: relative;
        border-radius:10px;
        background-size:cover;
        background-position:center;
        background-repeat:no-repeat;
        background-image:url(${props => props.imagen});
      }
      &:after {
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
      }
    `
      const NoImagen =  styled.div`
      & {
          width: 30%;
          height: 30%;
          position: relative;
          border-radius:10px;
          background-size:contain;
          background-position:center;
          background-repeat:no-repeat;
          background-image:url('/assets/noPic.png');
        }
      `






class CrearPublicacion extends React.Component {
  state = {
    valoresInput: {imagen:""},
    comprobarImagen:false,
    categorias: [],
    subCategorias: []
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

  
  enviarForm = (e) => {
    e.preventDefault();
    console.log(e.target.dataset.done)
    const evaluarImagen = {...this.state.valoresInput}
    if(evaluarImagen)
    this.props.enviarPublicacion(this.state.valoresInput);
  };

  comprobarImagen = (e) => {
      e.preventDefault()
    this.setState({...this.state, comprobarImagen:!this.state.comprobarImagen});
  };



  ingresarImagen = React.createRef()

  focusInput = (e)=>{
    this.ingresarImagen.current.focus()
  }


  render() {
    return (
      <div className="contenedor">
        <form
          className="contenedor-reseña"
        >
          <div className="contenedor-inputs-selects-textarea">
            <div className="contenedor-inputsYselects">
              <div className="contenedor-selects">
                <select
                  name="categoria"
                  defaultValue=""
                  required={true}
                  onChange={this.setearInput}
                  style={{backgroundImage:`url(/assets/dropDownArrow.png)`}}
                  className={
                    this.state.valoresInput.categoria
                      ? "input-select"
                      : "input-select categoria"
                  }
                >
                  <option value="" disabled>
                    Seleccione una Categoria
                  </option>
                  {/* Mapeo de categorias */}
                  <option value="Opcion 1">Opcion 1</option>
                  <option value="Opcion 2">Opcion 2</option>
                </select>
                <select
                  name="subcategoria"
                  defaultValue=""
                  required={true}
                  onChange={this.setearInput}
                  style={{backgroundImage:`url(/assets/dropDownArrow.png)`}}
                  className={
                    this.state.valoresInput.categoria
                      ? "input-select"
                      : "input-select d-none"
                  }
                >
                  <option value="" disabled>
                    Seleccione una Sub Categoria
                  </option>
                  {/* Mapeo de Subcategorias */}
                  <option value="Opcion 1">Opcion 1</option>
                  <option value="Opcion 2">Opcion 2</option>
                </select>
              </div>
              <div className="contenedor-inputs-externo">
                {/* Titulo */}
                <div className="contenedor-inputs-interno">
                    <label htmlFor="input-titulo" className="label-subtitulo-titulo titulosAlt">Titulo</label>
                    <input
                    type="text"
                    placeholder="Titulo"
                    autoComplete="off"
                    name="titulo"
                    required={true}
                    onChange={this.setearInput}
                    className="input-text"
                    id="input-titulo"
                    />
                </div>
                
                {/* Sub Titulo */}
                <div className="contenedor-inputs-interno">
                    <label htmlFor="input-subtitulo" className="label-subtitulo-titulo titulosAlt">Sub Titulo</label>
                    <input
                    type="text"
                    placeholder="Sub Titulo"
                    autoComplete="off"
                    name="subtitulo"
                    required={true}
                    onChange={this.setearInput}
                    className="input-text"
                    id="input-subtitulo"
                    />
                </div>

              </div>
            </div>
            <div className="contenedor-textarea">
              {/* Descripcion / reseña */}
              <textarea
                className="input-textarea"
                rows={10}
                cols={60}
                minLength={500}
                name="descripcion/reseña"
                onChange={this.setearInput}
                required={true}
              />
            </div>
          </div>
          <div className="contenedor-input-foto">
                <div className="input-imagen-boton-comprobar">
                    <input type="text" ref={this.ingresarImagen} name="imagen" onChange={this.setearInput} placeholder="Carga tu portada" className="input-imagen" />
                    <button  onClick={this.comprobarImagen} className="boton-comprobar">Comprobar imagen</button>
                </div>
                {!this.state.comprobarImagen && <NoImagen  className="noImage" onClick={this.focusInput}/> }
                {this.state.comprobarImagen ? <Imagen imagen={this.state.valoresInput.imagen}/> 
                : <>
                    <input type="text"  name="pro" onChange={this.setearInput} placeholder="Pros" className="input-imagen" />
                    <input type="text"  name="contra" onChange={this.setearInput} placeholder="Contras" className="input-imagen" />
                </> }
                
          </div>
          <div className="contenedor-enviarForm">
            {/* Boton enviar formulario */}
            <button onClick={this.enviarForm}  data-done={this.state.valoresInput.imagen.length > 10}  className="boton-postear texto texto-white texto-negrita">
              Postear
            </button>
            
          </div>
        </form>

        <div></div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  enviarPublicacion: publicacionesActions.enviarFormulario,
};

export default connect(null, mapDispatchToProps)(CrearPublicacion);
