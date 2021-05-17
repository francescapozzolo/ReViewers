import {connect} from 'react-redux'
import React , {useEffect , useState} from 'react'
import publicacionesActions from '../redux/actions/publicacionesActions'
import PublicacionIndividual from '../components/utilidades/PublicacionIndividual'
import { useParams } from 'react-router-dom';

const Publicaciones = (props)=>{
    const [publicaciones, setPublicaciones] = useState([])
    const {categoria} = useParams("")
    const [portada, setPortada] = useState(`url('/assets/caratulas/${categoria === 'all' ? 'bgTodasPublicaciones' : categoria}.jpg')`)
    const categoriaCapitalized = categoria === "all" ? "Todas las publicaciones" : categoria.charAt(0).toUpperCase() + categoria.slice(1)

    
    useEffect(()=>{
        const fetchear = async()=>{
            const todasLasPublicaciones = await props.todasPublicaciones()
            categoria === "all" ? setPublicaciones(todasLasPublicaciones) : setPublicaciones(todasLasPublicaciones.filter(publicacion => publicacion.categoria === categoria))
        }
        fetchear();
        
        // eslint-disable-next-line
    },[])

    const filtrarPublicaciones = async(valorDelFiltro)=>{

        props.filtroPorPalabraClave(valorDelFiltro)

        // if(publicaciones.length === 0){
        //     setPublicaciones(props.publicaciones)
        // }
        
        categoria === "all" 
            ? setPublicaciones(props.publicacionesFiltradas) 
            : setPublicaciones(props.publicacionesFiltradas.filter(publicacion => publicacion.categoria === categoria))
        
    }
    return(
        <>
            <div className="contenedor-tituloDeResenia">
                <div className="imagen-de-categoria" style={{backgroundImage: portada}}></div>
            <h1 className="titulo-de-resenia titulosAlt" style={{top:'0px'}}>{categoriaCapitalized}</h1>
            </div>

            <div className="input-filtrador-container">
                <input type="text" className="input-filtrador" placeholder="Busca tus temas favoritos!"
                    onChange={(e)=> filtrarPublicaciones(e.target.value)} />
            </div>
            
            <div className="contenedorPublic">
                {publicaciones && publicaciones.map((publicacion , index)=>{
                    return(
                        <PublicacionIndividual key={index} publicacion={publicacion}/>
                    )
                })}
            </div>

        </>
    )
}

const mapStateToProps = state => {
    return {
        publicaciones: state.publicacionReducer.todasLasPublicaciones,
        publicacionesFiltradas: state.publicacionReducer.publicacionesFiltradas
    }
}
const mapDispatchToProps = {
    todasPublicaciones: publicacionesActions.obtenerTodasPublicaciones,
    filtroPorPalabraClave: publicacionesActions.filtroPorPalabraClave
}

export default connect(mapStateToProps , mapDispatchToProps)(Publicaciones)