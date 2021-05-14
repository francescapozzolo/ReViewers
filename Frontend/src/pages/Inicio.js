import React from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import publicacionesActions from '../redux/actions/publicacionesActions';

class Inicio extends React.Component{
    
    // state = {
    //     categoriasSeleccionadas: [],
    //     publicaciones: [],
    //     publicacionesPorCategoria: []
    // }

    // componentDidMount(){
    //     this.props.cargarPublicaciones(this.setState({
    //         ...this.state,
    //         publicaciones: [...this.props.publicaciones],
    //     }))
    // }
    
    // elegirCategorias = (e)=>{
    //     const categoriaItem = e.target.dataset.info
    //     if(this.state.categoriasSeleccionadas.indexOf(categoriaItem) === -1){
    //         this.setState({
    //             ...this.state,
    //             categoriasSeleccionadas: [...this.state.categoriasSeleccionadas, categoriaItem]
    //         })
    //     } else{
    //         this.setState({
    //             ...this.state,
    //             categoriasSeleccionadas: this.state.categoriasSeleccionadas.filter(item => item !== categoriaItem)
    //         })
    //     }  
    // }

    // filtrarPorCategoria = () =>{
    //     let stringCategoria = this.state.categoriasSeleccionadas.join('')
    //     this.props.publicaciones.filter(publicacion => {})
    //     // let filtrao = this.props.publicaciones.filter(publicacion =>this.state.categoriasSeleccionadas.filter(item => item === publicacion.categoria))
    //     // console.log(filtrao)
    // }

    render() {
        // console.log(this.state.categoriasSeleccionadas)
        // console.log(this.props.publicaciones)
        // this.filtrarPorCategoria()
        return(      
            <main>
                <div className="contenedorLinkCategoria">
                    <p data-info="Entretenimiento" onClick={this.elegirCategorias} className="link titulosAlt">Entretenimiento</p>
                    <p data-info="Deportes" onClick={this.elegirCategorias} className="link titulosAlt">Deportes</p>
                    <p data-info="Gastronomía" onClick={this.elegirCategorias} className="link titulosAlt">Gastronomía</p>
                    <p data-info="Tecnología" onClick={this.elegirCategorias} className="link titulosAlt">Tecnología</p>
                </div>
                <div className="gridInicio">
                    {this.props.publicaciones.slice(0, 10).map(publicacion=>{
                        return(
                            <div style={{backgroundImage: `url('${publicacion.imagen}')`}}></div>
                        )
                    })}
                </div>
            </main>
        )
    }
}

const mapStateToProps = state => {
    return{
        publicaciones: state.publicacionReducer.publicaciones
    }
}

const mapDispatchToProps = {
    cargarPublicaciones: publicacionesActions.obtenerTodasPublicaciones
}

export default connect(mapStateToProps, mapDispatchToProps)(Inicio);
