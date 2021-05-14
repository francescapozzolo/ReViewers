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
        Gastronomía: [],
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
            [categoriaItem]: this.state[categoriaItem].length > 0 ? [] : this.props.publicaciones.filter(publicacion => publicacion.categoria === categoriaItem),
        }, () => {
            const arrayAComparar = [...this.state.Deportes, ...this.state.Entretenimiento, ...this.state.Tecnología, ...this.state.Gastronomía]
            this.setState({
                ...this.state,
                categoriasSeleccionadas: [...arrayAComparar]
            })
        })
    }

    render() {
        console.log(this.state)
        return(      
            <main>
                <div className="contenedorLinkCategoria">
                    <p data-info="Entretenimiento" onClick={this.elegirCategorias} className="link titulosAlt">Entretenimiento</p>
                    <p data-info="Deportes" onClick={this.elegirCategorias} className="link titulosAlt">Deportes</p>
                    <p data-info="Gastronomía" onClick={this.elegirCategorias} className="link titulosAlt">Gastronomía</p>
                    <p data-info="Tecnología" onClick={this.elegirCategorias} className="link titulosAlt">Tecnología</p>
                </div>
                <div className="gridInicio">
                    {this.state.categoriasSeleccionadas.length === 0 ? this.props.publicaciones.slice(0, 10).map((publicacion, index)=>{
                        return(
                            <div key={index} style={{backgroundImage: `url('${publicacion.imagen}')`}}></div>
                        )
                    })
                    : this.state.categoriasSeleccionadas.slice(0, 10).map((publicacion, index)=>{
                        return(
                            <div key={index} style={{backgroundImage: `url('${publicacion.imagen}')`}}></div>
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
