// import React from 'react'
// import { connect } from "react-redux"
// import formActions from '../redux/actions/formActions'

// class Publicacion extends React.component{    
//     state = {
//         valoresInput:{},
//         categorias: [],
//         subCategorias:[],
//         filepreview: null
//     }

//     setearInput = (e)=>{
//         console.log(e.target.name,e.target.value)
//         const valueInput = e.target.value
//         const campoInput = e.target.name
//         this.setState({
//             ...this.state,
//             valoresInput:{
//                 ...this.valoresInput,
//                 [campoInput]:valueInput}
//             })
//     }

//     enviarForm = (e)=>{
//         e.preventDefault()
//         console.log(this.valoresInput)
//     }

//     obtenerImagen = (e)=>{
//         console.log(e.target.files)
//     }
//     onChange(e){
//         this.setState({filepreview:URL.createObjectURL(e.target.files[0]        )      
//         })  
//        }

//    render(){

//     return (<div className="contenedor">
//                 <form className="contenedor-reseña">
//                     <div className="contenedor-inputs-selects-textarea">
//                         <div className="contenedor-inputsYselects">
//                             <div className="contenedor-selects">
//                                 <select name="categoria" defaultValue="" required={true} onChange={this.setearInput} className={this.valoresInput.categoria ? "input-select" : "input-select categoria"}>
//                                     <option value="" disabled >Seleccione una Categoria</option>
//                             {/* Mapeo de categorias */}
//                                     <option value="Opcion 1">Opcion 1</option>
//                                     <option value="Opcion 2">Opcion 2</option>
//                                 </select>
//                                 <select name="subcategoria" defaultValue="" required={true} onChange={this.setearInput} className={this.valoresInput.categoria ? "input-select" : "input-select d-none"}>
//                                     <option value="" disabled >Seleccione una Sub Categoria</option>
//                                 {/* Mapeo de Subcategorias */}
//                                     <option value="Opcion 1">Opcion 1</option>
//                                     <option value="Opcion 2">Opcion 2</option>
//                                 </select>
//                             </div>
//                             <div className="contenedor-inputs">
//                                 {/* Titulo */}
//                                 <input type="text" placeholder="Titulo" autoComplete="off" name="titulo" required={true} onChange={this.setearInput} className="input-text"/>
//                                 {/* Sub Titulo */}
//                                 <input type="text" placeholder="Sub Titulo" autoComplete="off" name="subtitulo" required={true} onChange={this.setearInput} className="input-text"/>
//                             </div>
//                         </div>
//                         <div className="contenedor-textarea">
//                             {/* Descripcion / reseña */}
//                             <textarea className="input-textarea" rows={10} cols={60} minLength={500}  name="descripcion/reseña" onChange={this.setearInput} required={true}  />
//                         </div>
//                     </div>

//                     <div className="contenedor-input-foto">
//                         {/* <input type="file" className="input-file" onChange={onImageChange} id="group_image"/>
//                         <img id="target" src={imagen} alt="imagen-subida"/> */}
//                          <input type="file" name="myImage" onChange= {this.onChange} />
//                         <img class="img-preview" src={this.state.filepreview}/>

//                     </div>
//                     <div className="contenedor-enviarForm">
//                         {/* Boton enviar formulario */}
//                         <button onClick={this.enviarForm} className="boton-postear"> Postear</button>
//                     </div>
//                 </form>
//                 <div>
//             </div>
//         </div>
//         )
//     }
// }


// const mapStateToProps = state =>{
//     return{}
// }

// const mapDispatchToProps = {
//     obtenerCategorias: formActions.obtenerCategorias,
//     obtenerSubCategorias: formActions.obtenerSubCategorias
// }

// export default connect (mapStateToProps, mapDispatchToProps)(Publicacion)