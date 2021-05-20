import React from 'react'
import { connect } from 'react-redux'
import Tooltip from "@material-ui/core/Tooltip";
import { Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import {Link} from 'react-router-dom'

class Inicio extends React.Component{
    state = {
        categoriasSeleccionadas: [],
        publicaciones: [],
        deportes: [],
        entretenimiento: [],
        tecnologia: [],
        gastronomia: [],
        mobile: false
    }   

    componentDidMount(){

        window.scroll({
            top: 0,
            left: 0,
          })
        this.setState({
            ...this.state,
            publicaciones: [...this.props.publicaciones],
        })
    }

    elegirCategorias = (e)=>{
        const categoriaItem = e.target.dataset.info
        this.setState({
            ...this.state,    
            [categoriaItem]: this.state[categoriaItem].length > 0 ? [] : this.props.publicaciones.filter(publicacion => publicacion.categoria === categoriaItem),

        }, () => {
            const arrayAComparar = [...this.state.deportes, ...this.state.entretenimiento, ...this.state.tecnologia, ...this.state.gastronomia]
            this.setState({
                ...this.state,
                categoriasSeleccionadas: [...arrayAComparar]
            })
        })
    }

    shuffle = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      return array;
      }
      
      render() {

        if(!this.props.publicaciones || this.props.publicaciones.length < 1 ){
            return <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
          </div>
        }

        const evaluacion = this.state.categoriasSeleccionadas.length === 0 
        let stateOprops = evaluacion ? "props" : "state"
        let array = evaluacion ? "publicaciones" : "categoriasSeleccionadas" 
        const randomArray = this.shuffle(this[stateOprops][array])
        return(      
            <main>
                <div className="contenedorLinkCategoria">
                    {this.props.usuarioLogeado.intereses.length === 0
                    ?
                    <>
                        <p data-info="entretenimiento" onClick={this.elegirCategorias} style={this.state.entretenimiento.length === 0 ? {color: 'gray'}: {color: 'blueviolet'}} className="link titulosAlt">Entretenimiento</p>
                        <p data-info="deportes" onClick={this.elegirCategorias} style={this.state.deportes.length === 0 ? {color: 'gray'}: {color: 'blueviolet'}} className="link titulosAlt">Deportes</p>
                        <p data-info="gastronomia" onClick={this.elegirCategorias} style={this.state.gastronomia.length === 0 ? {color: 'gray'}: {color: 'blueviolet'}} className="link titulosAlt">Gastronomía</p>
                        <p data-info="tecnologia" onClick={this.elegirCategorias} style={this.state.tecnologia.length === 0 ? {color: 'gray'}: {color: 'blueviolet'}}className="link titulosAlt">Tecnología</p>
                    </>
                    :
                    this.props.usuarioLogeado.intereses.map((interes, index) => {
                        return(
                                <p data-info={interes} key={index} onClick={this.elegirCategorias} style={this.state[interes].length === 0 ? {color: 'gray'}: {color: 'blueviolet'}} className="link titulosAlt">{interes}</p>
                        )
                    })
                }
                    
                </div>


                <div className="gridInicio">
                    {
                    randomArray.slice(0, 10).map((publicacion, index)=>{
                        const valoracion = publicacion.valoraciones.reduce((acc, valoracion, index)=>{
                            let num = valoracion.valoracion
                            return acc= acc + num 
                        }, 0) / publicacion.valoraciones.length

                        return(
                            <Link to={`/publicacion/${publicacion._id}`} className="cajaPublicacion titulosAlt" key={index} style={ {backgroundImage: `url('${publicacion.imagen}')`}}>
                                <div className="capa">
                                <Tooltip arrow title={`Ir a seccion ${publicacion.categoria}`} placement="top-start">
                                    <Link to={`/publicaciones/${publicacion.categoria}`} className="textoCategoria">{publicacion.categoria}</Link>
                                </Tooltip> 
                                    <p className="textoTit">{publicacion.titulo}</p>
                                    <p className="textoAutor">Publicado por {publicacion.autor.nombre}</p>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <Rating name="read-only" value={valoracion} readOnly />
                                    </Box>
                                </div>
                            </Link>
                            
                        )
                    })
                }
                </div>
            </main>
        )
    }
}

const mapStateToProps = state => {
    return{
        publicaciones: state.publicacionReducer.todasLasPublicaciones,
        publicacionesFiltradas: state.publicacionReducer.publicacionesFiltradas,
        usuarioLogeado: state.authReducer.usuarioLogeado
    }
}

export default connect(mapStateToProps)(Inicio);
