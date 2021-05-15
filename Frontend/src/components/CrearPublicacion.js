import React from "react";
import { connect } from "react-redux";
import publicacionesActions from "../redux/actions/publicacionesActions";
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import { toast } from 'react-toastify';


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
        cursor:pointer;
      }
      ${props => !props.done ? 
        `&:after {
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
    valoresInput: {categoria:"", subcategoria:"", titulo:"", subtitulo:"", descripcion:"", imagen:"", pro:"", contra:"", tags:"" },
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

  toasts = (tipo, mensaje, position, autoClose, closeOnClick, pauseOnHover, draggable, toastId, closeButton)=>{
    toast[tipo](mensaje, {
      position,
      closeOnClick,
      pauseOnHover,
      draggable,
      toastId,
      closeButton,
      autoClose
      });
  }
  
  enviarForm = (e) => {
    e.preventDefault();

    // console.log(e.target.dataset.done)
    const tagsComa = this.state.valoresInput.tags.split(',')

    // PREPROCESADO DE INPUTS
    let tags = tagsComa.map(tag => tag.trim().toLocaleLowerCase())
    tags = tags.filter(tag => tag !== " " && tag !== "")
    
    let pro = tagsComa.map(pro => pro.trim().toLocaleLowerCase())
    pro = pro.filter(pro => pro !== " " && pro !== "")
    
    let contra = tagsComa.map(contra => contra.trim().toLocaleLowerCase())
    contra = contra.filter(contra => contra !== " " && contra !== "")
    
    let {imagen, categoria, subcategoria, titulo, subtitulo, descripcion} = this.state.valoresInput
    imagen = imagen.trim()
    titulo = titulo.trim()
    subtitulo = subtitulo.trim()
    descripcion = descripcion.trim()

    if(descripcion.length >= 500 && titulo !== "" && subtitulo !== "" && imagen !== ""){
      const schemaAEnviar = {categoria,subcategoria,titulo,subtitulo,descripcion,imagen,pro,contra,tags}
      const respuestaErrorOConfirmacion = this.props.enviarPublicacion(schemaAEnviar);
      console.log(respuestaErrorOConfirmacion)
      // ACA MAPEAR ERRORES
    }else if(descripcion.length < 500 ){
      this.toasts("warning","La reseña debe contener 500 caracteres como minimo", "top-center", 5000, true, false, true, "error500Caracteres", true)
    }else{
      this.toasts("error","Hay campos requeridos incompletos.", "top-center", 5000, true, false, true, "error500Caracteres", true)
    }

  };

  comprobarImagen = (e) => {
      e.preventDefault()
    this.setState({...this.state, comprobarImagen:!this.state.comprobarImagen});
  };

  presionoEnter = (e)=>{
    if (e.key === 'Enter') {
      console.log('do validate');
    }
  }



  ingresarImagen = React.createRef()


  render() {
    return (
      <div className="contenedor">

        <form
          className="contenedor-reseña"
        >
          <div className="contenedor-inputs-selects-textarea">
            <div className="contenedor-inputsYselects">
              <div className="contenedor-selects">
                <Tooltip arrow title="La Categoria de su reseña" placement="top-start">
                  <select
                    name="categoria"
                    defaultValue=""
                    
                    onChange={this.setearInput}
                    style={{backgroundImage:`url(/assets/dropDownArrow.png)`}}
                    className={
                      this.state.valoresInput.categoria
                        ? "input-select"
                        : "input-select categoria"
                    }
                  >
                    <option value="" disabled>
                      Categoria
                    </option>
                  {/* Mapeo de categorias */}
                    <option value="Opcion 1">Opcion 1</option>
                    <option value="Opcion 2">Opcion 2</option>
                  </select>
                </Tooltip>
                <Tooltip arrow title="La Sub Categoria de su reseña" placement="top-start">
                  <select
                    name="subcategoria"
                    defaultValue=""
                    
                    onChange={this.setearInput}
                    style={{backgroundImage:`url(/assets/dropDownArrow.png)`}}
                    className={
                      this.state.valoresInput.categoria
                        ? "input-select"
                        : "input-select d-none"
                    }
                  >
                    <option value="" disabled>
                      Sub categoria
                    </option>
                    {/* Mapeo de Subcategorias */}
                    <option value="Opcion 1">Opcion 1</option>
                    <option value="Opcion 2">Opcion 2</option>
                  </select>
                </Tooltip>
              </div>

              <div className="contenedor-inputs-externo">
                {/* Titulo */}
                <div className="contenedor-inputs-interno">
                    <label htmlFor="input-titulo" className="label-subtitulo-titulo titulosAlt">Titulo</label>
                <Tooltip arrow title="El Título de su reseña" placement="top">
                    <input value={this.state.valoresInput.titulo}
                    type="text"
                    placeholder="Titulo"
                    autoComplete="off"
                    name="titulo"
                    
                    onChange={this.setearInput}
                    className="input-text"
                    id="input-titulo"
                    />
                </Tooltip>
                
                </div>
                
                {/* Sub Titulo */}
                <div className="contenedor-inputs-interno">
                    <label htmlFor="input-subtitulo" className="label-subtitulo-titulo titulosAlt">Sub Titulo</label>
                <Tooltip arrow title="El Sub Título de su reseña" placement="top-end">
                    <input value={this.state.valoresInput.subtitulo}
                    type="text"
                    placeholder="Sub Titulo"
                    autoComplete="off"
                    name="subtitulo"
                    
                    onChange={this.setearInput}
                    className="input-text"
                    id="input-subtitulo"
                    style={{alignSelf:"flex-end"}}
                    />
                </Tooltip>
                </div>

              </div>
            </div>
            <div className="contenedor-textarea">
              {/* Descripcion / reseña */}
              <div className="contenedor-textarea-interno">
                <label htmlFor="textarea" className="label-subtitulo-titulo texto label-textarea">Escriba su reseña aquí</label>
                <Tooltip arrow title="Escriba su Reseña" placement="bottom">

                  <textarea value={this.state.valoresInput.descripcion}
                    className="input-textarea"
                    id="textarea"
                    rows={10}
                    cols={60}
                    minLength={500}
                    name="descripcion"
                    onChange={this.setearInput}                    
                  />
              </Tooltip>
              </div>
            </div>
          </div>
          <div className="contenedor-input-foto">
                <div className="input-imagen-boton-comprobar">
                  <Tooltip arrow title="La imagen de portada de su reseña" placement="top-start">
                    <input value={this.state.valoresInput.imagen} type="text" ref={this.ingresarImagen} autoComplete="off" name="imagen" onChange={this.setearInput} placeholder="Cargue su portada" className="input-imagen" />
                  </Tooltip>
                  <Tooltip title="Compruebe si su imagen se muestra correctamente" placement="bottom-start">
                    <button  onClick={this.comprobarImagen} className="boton-comprobar">
                      {this.state.comprobarImagen ?
                        "Editar Pros / Contras / Tags"
                        :"Comprobar imagen" 
                      }
                    </button>
                  </Tooltip>
                </div>
                {this.state.comprobarImagen 
                ? <Tooltip arrow title={this.state.valoresInput.imagen.length > 32 ? "Imagen de portada" : "Imagen de portada NO VALIDA"} placement="bottom">
                    <Imagen imagen={this.state.valoresInput.imagen} done={this.state.valoresInput.imagen.length > 32} onClick={()=>this.ingresarImagen.current.focus()}/> 
                  </Tooltip>
                : <div className="contenedor-pro-contra-tag">
                    <label htmlFor="pro" className="label-subtitulo-titulo titulosAlt label-pro-contra">Pros:</label>
                  <Tooltip arrow title="Ingrese el/los Pros de lo reseñado separados por una coma ' , '" placement="top-end">
                    <input type="text" value={this.state.valoresInput.pro}id="pro" autoComplete="off" name="pro" onChange={this.setearInput} placeholder="Pros" className="input-imagen" />
                  </Tooltip>
                    <label htmlFor="contra" className="label-subtitulo-titulo titulosAlt label-pro-contra">Contras:</label>
                  <Tooltip arrow title="Ingrese el/los Contras de lo reseñado separados por una coma ' , '" placement="top-end">
                    <input type="text" value={this.state.valoresInput.contra}id="contra" autoComplete="off" name="contra" onChange={this.setearInput} placeholder="Contras" className="input-imagen" />
                  </Tooltip>
                    <label htmlFor="tags" className="label-subtitulo-titulo titulosAlt label-pro-contra">Tags:</label>
                  <Tooltip arrow title="Ingrese el/los Tags de lo reseñado separados por una coma ' , '" placement="top-end">
                    <input type="text" value={this.state.valoresInput.tags}id="tags" autoComplete="off" name="tags" onChange={this.setearInput} placeholder="Tags" className="input-imagen" />
                  </Tooltip>
                </div> }
                
          </div>
          <div className="contenedor-enviarForm">
            {/* Boton enviar formulario */}
            <Tooltip arrow title="Postear Reseña" placement="bottom">
              <button onClick={this.enviarForm}  data-done={this.state.valoresInput.imagen.length > 12}  className="boton-postear texto texto-white texto-negrita">
                Postear
              </button>
            </Tooltip>
          </div>
        </form>

        <div></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    publicaciones: state.publicacionReducer.todasLasPublicaciones
  }
}
const mapDispatchToProps = {
  enviarPublicacion: publicacionesActions.enviarFormulario,
  cargarPublicaciones: publicacionesActions.obtenerTodasPublicaciones
};

export default connect(mapStateToProps, mapDispatchToProps)(CrearPublicacion);
