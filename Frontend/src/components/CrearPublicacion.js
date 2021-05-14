import React from 'react'
import {connect} from 'react-redux'
import publicacionesActions from '../redux/actions/publicacionesActions'
class CrearPublicacion extends React.Component {


    state = {
<<<<<<< HEAD
        valoresInput:{filepreview: null},
        categorias: [],
        subCategorias:[]
=======

        valoresInput:{},
        categorias: [],
        subCategorias:[],
        filepreview: null
>>>>>>> 9646c8291271a3cb6b43542307028d3f03d68001
    }

    setearInput = (e)=>{
        console.log(e.target.name,e.target.value)
        const valueInput = e.target.value
        const campoInput = e.target.name
        this.setState({
            ...this.state,
            valoresInput:{
                ...this.state.valoresInput,
                [campoInput]:valueInput}
            })
    }

    enviarForm = (e)=>{
        e.preventDefault()
        console.log(this.state)
<<<<<<< HEAD
        this.props.cargarPublicacion(this.state.valoresInput)
=======

        this.props.cargarPublicacion(this.state.valoresInput.imagen, this.state.valoresInput)

>>>>>>> 9646c8291271a3cb6b43542307028d3f03d68001
    }


    onChange = (e)=>{
<<<<<<< HEAD
        this.setState({...this.state, valoresInput:{...this.state.valoresInput, filepreview:URL.createObjectURL(e.target.files[0])}})  
=======


        this.setState({...this.state, filepreview:URL.createObjectURL(e.target.files[0]) ,valoresInput:{...this.state.valoresInput, imagen:e.target.files[0]}})  

>>>>>>> 9646c8291271a3cb6b43542307028d3f03d68001
       }

    render(){
        console.log(this.state.valoresInput)
        return (
            <div className="contenedor">
<<<<<<< HEAD
                        <form className="contenedor-reseña">
=======

                        <form className="contenedor-reseña" action="/api/publicaciones" method="POST" encType="multipart/form-data">
>>>>>>> 9646c8291271a3cb6b43542307028d3f03d68001
                            <div className="contenedor-inputs-selects-textarea">
                                <div className="contenedor-inputsYselects">
                                    <div className="contenedor-selects">
                                        <select name="categoria" defaultValue="" required={true} onChange={this.setearInput} className={this.state.valoresInput.categoria ? "input-select" : "input-select categoria"}>
                                            <option value="" disabled >Seleccione una Categoria</option>
                                    {/* Mapeo de categorias */}
                                            <option value="Opcion 1">Opcion 1</option>
                                            <option value="Opcion 2">Opcion 2</option>
                                        </select>
                                        <select name="subcategoria" defaultValue="" required={true} onChange={this.setearInput} className={this.state.valoresInput.categoria ? "input-select" : "input-select d-none"}>
                                            <option value="" disabled >Seleccione una Sub Categoria</option>
                                        {/* Mapeo de Subcategorias */}
                                            <option value="Opcion 1">Opcion 1</option>
                                            <option value="Opcion 2">Opcion 2</option>
                                        </select>
                                    </div>
                                    <div className="contenedor-inputs">
                                        {/* Titulo */}
                                        <input type="text" placeholder="Titulo" autoComplete="off" name="titulo" required={true} onChange={this.setearInput} className="input-text"/>
                                        {/* Sub Titulo */}
                                        <input type="text" placeholder="Sub Titulo" autoComplete="off" name="subtitulo" required={true} onChange={this.setearInput} className="input-text"/>
                                    </div>
                                </div>
                                <div className="contenedor-textarea">
                                    {/* Descripcion / reseña */}
                                    <textarea className="input-textarea" rows={10} cols={60} minLength={500}  name="descripcion/reseña" onChange={this.setearInput} required={true}  />
                                </div>
                            </div>
                            <div className="contenedor-input-foto">
                                        <input type="file" name="myImage" onChange= {this.onChange} />
<<<<<<< HEAD
                                        <div className="img-preview" style={{backgroundImage:`url(${this.state.valoresInput.filepreview})`}}/>              
=======

                                        <div className="img-preview" style={{backgroundImage:`url(${this.state.filepreview})`}}/>              

>>>>>>> 9646c8291271a3cb6b43542307028d3f03d68001
                            </div>
                            <div className="contenedor-enviarForm">
                                {/* Boton enviar formulario */}
                                <button onClick={this.enviarForm} className="boton-postear"> Postear</button>
                            </div>
                        </form>
                        <div>
                    </div>
                </div>
                )
            }
        }

<<<<<<< HEAD

=======
>>>>>>> 9646c8291271a3cb6b43542307028d3f03d68001
        const mapDispatchToProps = {
            cargarPublicacion: publicacionesActions.enviarFormulario
        }

export default connect (null, mapDispatchToProps)(CrearPublicacion)