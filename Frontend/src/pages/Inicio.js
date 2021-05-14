import React from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import publicacionesActions from '../redux/actions/publicacionesActions';

class Inicio extends React.Component{
    
    state = {
        categoriasSeleccionadas: [],
        publicaciones: [],
        Deportes: [],
        Entretenimiento: [],
        Tecnología: [],
        Gastronomía: []
    }

    componentDidMount(){
        this.props.cargarPublicaciones(this.setState({
            ...this.state,
            publicaciones: [...this.props.publicaciones],
        }))
    }
    
    elegirCategorias = (e)=>{
        const categoriaItem = e.target.dataset.info
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
            [categoriaItem]: this.props.publicaciones.filter(publicacion => publicacion.categoria === categoriaItem)
        }) 
    }

    // filtrarCategorias = (e) => {
    //     const categoriaItem = e.target.dataset.info
    //     console.log(categoriaItem)
    //     console.log(this.props.publicaciones.filter(publicacion => publicacion.categoria === categoriaItem))
    //     this.setState({
    //         ...this.state,
    //         // publicacionesUpdated: {
    //         //     ...this.publicacionesUpdated,
    //             Deportes: this.props.publicaciones.filter(publicacion => publicacion.categoria === categoriaItem)    
    //         }
    //     // }
    //     ) 
    // }

    functionGeneral = (e) => {
        // this.filtrarCategorias(e)
        this.elegirCategorias(e)
    }

    render() {
        console.log(this.state)
          
        return(      
            <main>
                <div className="contenedorLinkCategoria">
                    <p data-info="Entretenimiento" onClick={this.functionGeneral} className="link titulosAlt">Entretenimiento</p>
                    <p data-info="Deportes" onClick={this.functionGeneral} className="link titulosAlt">Deportes</p>
                    <p data-info="Gastronomía" onClick={this.functionGeneral} className="link titulosAlt">Gastronomía</p>
                    <p data-info="Tecnología" onClick={this.functionGeneral} className="link titulosAlt">Tecnología</p>
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
