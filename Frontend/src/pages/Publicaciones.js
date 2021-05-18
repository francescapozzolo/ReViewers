import {connect} from 'react-redux'
import React , {useEffect , useState} from 'react'
import publicacionesActions from '../redux/actions/publicacionesActions'
import PublicacionIndividual from '../components/utilidades/PublicacionIndividual'
import { useParams } from 'react-router-dom';

const Publicaciones = (props)=>{
    const [publicaciones, setPublicaciones] = useState([])
    const [publicacionesPorCategoria, setPublicacionesPorCategoria] = useState([])

    const {categoria} = useParams("")
     // eslint-disable-next-line 
    const [portada, setPortada] = useState(`url('/assets/caratulas/${categoria === 'all' ? 'bgTodasPublicaciones' : categoria}.jpg')`)
    const categoriaCapitalized = categoria === "all" ? "Todas las publicaciones" : categoria.charAt(0).toUpperCase() + categoria.slice(1)

    useEffect(()=>{
        window.scroll({
            top: 0,
            left: 0,
          })
        if(props.todasLasPublicaciones.length === 0){
            const fetchear = async()=>{
                const traerTodasLasPublicaciones = await props.todasPublicaciones()
                categoria === "all" 
                ? setPublicaciones(traerTodasLasPublicaciones) 
                : setPublicaciones(traerTodasLasPublicaciones.filter(publicacion => publicacion.categoria === categoria))
                categoria === "all" 
                ? setPublicacionesPorCategoria(traerTodasLasPublicaciones) 
                : setPublicacionesPorCategoria(traerTodasLasPublicaciones.filter(publicacion => publicacion.categoria === categoria))
            }
                fetchear();
            }else{
                categoria === "all" 
                ? setPublicaciones(props.todasLasPublicaciones) 
                : setPublicaciones(props.todasLasPublicaciones.filter(publicacion => publicacion.categoria === categoria))
                categoria === "all" 
                ? setPublicacionesPorCategoria(props.todasLasPublicaciones) 
                : setPublicacionesPorCategoria(props.todasLasPublicaciones.filter(publicacion => publicacion.categoria === categoria))
            }
        
        // eslint-disable-next-line
    },[categoria])

    const filtrarPublicaciones = async(valorDelFiltro)=>{
        categoria === "all" 
            ?  setPublicaciones(publicacionesPorCategoria.filter( publicacion => {
                   return publicacion.tags.find(tag => tag.toLowerCase().trim().slice(0, valorDelFiltro.length) === valorDelFiltro.toLowerCase())
            }))
            :   setPublicaciones(publicacionesPorCategoria.filter( publicacion => {
                    return publicacion.tags.find(tag => tag.toLowerCase().trim().slice(0, valorDelFiltro.trim().length) === valorDelFiltro.toLowerCase())
            }))

        if(valorDelFiltro.trim() === ''){
            setPublicaciones(publicacionesPorCategoria)
        }
    }

      
    if(!props.todasLasPublicaciones || props.todasLasPublicaciones.length < 1 ){
        return <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>
    }


    return(
        <>
            <div className="contenedor-tituloDeResenia">
                <div className="imagen-de-categoria" style={{backgroundImage: portada}}></div>
            <h1 className="titulo-de-resenia titulosAlt" style={{top:'0px'}}>{categoriaCapitalized}</h1>
            </div>

            <div className="input-filtrador-container">
                <input type="text" className="input-filtrador" 
                placeholder={ categoria === "all" ? "Busca publicaciones por tags! Ej: Gaming, Futbol, etc" : 
                              categoria === "deportes" ? "Busca publicaciones por tags! Ej: Futbol, Formula, etc" : 
                              categoria === "gastronomia" ? "Busca publicaciones por tags! Ej: Dulce, Bebida, etc" :
                              categoria === "tecnologia" ? "Busca publicaciones por tags! Ej: Robot, Gaming, etc" : 
                              categoria === "entretenimiento" && "Busca publicaciones por tags! Ej: Peliculas, Gaming, etc"  }
                    onChange={(e)=> filtrarPublicaciones(e.target.value)} />
            </div>
            
            <div className="contenedorPublic">
                {publicaciones && 
                    publicaciones.length > 0 
                    ? publicaciones.map((publicacion , index)=>{
                            return<PublicacionIndividual key={index} publicacion={publicacion}/>})
                    :   
                        <div className="contenedor-noHayMatch">
                            <div className="contenedor-texto-noHayMatch">
                                <h3 className="titulosAlt h3-noHayMatch" >Lo sentimos. No hay publicaciones que incluyan esos tags</h3>
                                <p className="p-noHayMatch">Sin embargo puedes ver algunas de estas!</p>
                            </div>
                        
                                {publicacionesPorCategoria.map((publicacion , index)=>{
                                    return<PublicacionIndividual key={index} publicacion={publicacion}/>})}
                        </div> 
                }
            </div>

        </>
    )
}

const mapStateToProps = state => {
    return {
        todasLasPublicaciones: state.publicacionReducer.todasLasPublicaciones,
        publicacionesFiltradas: state.publicacionReducer.publicacionesFiltradas
    }
}
const mapDispatchToProps = {
    todasPublicaciones: publicacionesActions.obtenerTodasPublicaciones,
    filtroPorPalabraClave: publicacionesActions.filtroPorPalabraClave
}

export default connect(mapStateToProps , mapDispatchToProps)(Publicaciones)