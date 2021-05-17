import {connect} from 'react-redux'
import React , {useEffect , useState} from 'react'
import publicacionesActions from '../redux/actions/publicacionesActions'
import PublicacionIndividual from '../components/utilidades/PublicacionIndividual'
import Loader from 'react-loader-spinner'
import { useParams } from 'react-router-dom';

const Publicaciones = (props)=>{
//    console.log(props.match.params.categoria)
    const [publicaciones, setPublicaciones] = useState([])
    const {categoria} = useParams("")
    const [portada, setPortada] = useState(`url('/assets/caratulas/${categoria === 'all' ? 'bgTodasPublicaciones' : categoria}.jpg')`)
    const categoriaCapitalized = categoria === "all" ? "Todas las publicaciones" : categoria.charAt(0).toUpperCase() + categoria.slice(1)
    // console.log(categoria)
    
    useEffect(()=>{
        const fetchear = async()=>{
            const todasLasPublicaciones = await props.todasPublicaciones()
            console.log(todasLasPublicaciones)
            categoria === "all" ? setPublicaciones(todasLasPublicaciones) : setPublicaciones(todasLasPublicaciones.filter(publicacion => publicacion.categoria === categoria))
        }
        fetchear();
        
        // eslint-disable-next-line
        console.log(publicaciones)
    },[])

    const filtrarPublicaciones = async(valorDelFiltro)=>{
        console.log(valorDelFiltro)

        props.filtroPorPalabraClave(valorDelFiltro)

        // if(publicaciones.length === 0){
        //     console.log(props.publicaciones)
        //     setPublicaciones(props.publicaciones)
        // }
        
        categoria === "all" 
            ? setPublicaciones(props.publicacionesFiltradas) 
            : setPublicaciones(props.publicacionesFiltradas.filter(publicacion => publicacion.categoria === categoria))
        

        console.log(categoria)
        console.log(publicaciones)
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