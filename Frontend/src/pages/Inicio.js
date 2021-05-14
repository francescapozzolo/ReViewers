import React from 'react'
import { connect } from 'react-redux'
import publicacionesActions from '../redux/actions/publicacionesActions';
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
    }   

    componentDidMount(){
        this.props.cargarPublicaciones(this.setState({
            ...this.state,
            publicaciones: [...this.props.publicaciones],
        }))
    }
    
    elegirCategorias = (e)=>{
        const categoriaItem = e.target.dataset.info
        console.log(categoriaItem)
        if(this.state.categoriasSeleccionadas.indexOf(categoriaItem) === -1){
            this.setState({
                ...this.state,
                categoriasSeleccionadas: [...this.state.categoriasSeleccionadas, categoriaItem]
            })
        } else{
            this.setState({
                ...this.state,
                categoriasSeleccionadas: this.state.categoriasSeleccionadas.filter(item => item !== categoriaItem)
            })
        }
        
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

    render() {
        return(      
            <main>
                <div className="contenedorLinkCategoria">
                    <p data-info="entretenimiento" onClick={this.elegirCategorias} className="link titulosAlt">Entretenimiento</p>
                    <p data-info="deportes" onClick={this.elegirCategorias} className="link titulosAlt">Deportes</p>
                    <p data-info="gastronomia" onClick={this.elegirCategorias} className="link titulosAlt">Gastronomía</p>
                    <p data-info="tecnologia" onClick={this.elegirCategorias} className="link titulosAlt">Tecnología</p>
                </div>
                <div className="gridInicio">
                    {this.state.categoriasSeleccionadas.length === 0 ? this.props.publicaciones.slice(0, 10).map((publicacion, index)=>{
                        const valoracion = publicacion.valoraciones.reduce((acc, valoracion, index)=>{
                            let num = valoracion.valoracion
                            return acc= acc + num 
                        }, 0) / publicacion.valoraciones.length
                        return(
                            <Link to={`/publicacion/${publicacion._id}`} className="cajaPublicacion titulosAlt" key={index} style={ {backgroundImage: `url('${publicacion.imagen}')`}}>
                                <div className="capa">
                                    <Link to={`/publicaciones/${publicacion.categoria}`} className="textoCategoria">{publicacion.categoria}</Link>
                                    <p className="textoTit">{publicacion.titulo}</p>
                                    <p className="textoAutor">Publicado por </p>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <Rating name="read-only" value={valoracion} readOnly />
                                    </Box>
                                </div>
                            </Link>
                        )
                    })
                    : this.state.categoriasSeleccionadas.slice(0, 10).map((publicacion, index)=>{
                        const valoracion = publicacion.valoraciones.reduce((acc, valoracion, index)=>{
                            let num = valoracion.valoracion
                            return acc= acc + num 
                        }, 0) / publicacion.valoraciones.length
                        return(
                            <Link to={`/publicacion/${publicacion._id}`} className="cajaPublicacion titulosAlt" key={index} style={{backgroundImage: `url('${publicacion.imagen}')`}}>
                                <div className="capa">
                                    <Link to={`/publicaciones/${publicacion.categoria}`} className="textoCategoria">{publicacion.categoria}</Link>
                                    <p className="textoTit">{publicacion.titulo}</p>
                                    <p className="textoAutor">Publicado por </p>
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
        publicaciones: state.publicacionReducer.todasLasPublicaciones
    }
}

const mapDispatchToProps = {
    cargarPublicaciones: publicacionesActions.obtenerTodasPublicaciones
}

export default connect(mapStateToProps, mapDispatchToProps)(Inicio);
