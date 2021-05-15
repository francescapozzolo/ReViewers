import {connect} from 'react-redux'
import React , {useEffect , useState, useMatch} from 'react'
import publicacionesActions from '../redux/actions/publicacionesActions'
import PublicacionIndividual from '../components/utilidades/PublicacionIndividual'
import Loader from 'react-loader-spinner'
import { useParams } from 'react-router-dom';

const Publicaciones = (props)=>{
   
    const [publicaciones, setPublicaciones] = useState()
    const {categoria} = useParams()
    const categoriaCapitalized = categoria.charAt(0).toUpperCase() + categoria.slice(1)
    useEffect(()=>{
        const fetchear = async()=>{
            const todasLasPublicaciones = await props.todasPublicaciones()
            setPublicaciones(todasLasPublicaciones.filter(publicacion => publicacion.categoria === categoria))
        }
        fetchear()
    },[])
    
    if(!publicaciones || !publicaciones[1]){
        return(
            <div className="contenedorLoader">
                <Loader
                    type="Puff"
                    color="#161c26"
                    secondaryColor="#161c26"
                    height={450}
                    width={450}
                    timeout={3000} //3 secs
                />
            </div>
        )
    }

    // setPublicaciones(publicaciones.)

    return(
        <>
        <div className="contenedor-tituloDeResenia">
            <div className="imagen-de-categoria"></div>
            <h1 className="titulo-de-resenia titulosAlt" style={{top:'0px'}}>{categoriaCapitalized}</h1>
            {/* <h3 className="titulo-de-resenia titulosAlt">Alquileres de Robots para Eventos</h3> */}
         </div>
        <div className="contenedorPublic">
            {publicaciones.map((publicacion , index)=>{
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
        publicaciones: state.publicacionReducer.todasLasPublicaciones
    }
}
const mapDispatchToProps = {
    todasPublicaciones: publicacionesActions.obtenerTodasPublicaciones
}

export default connect(mapStateToProps , mapDispatchToProps)(Publicaciones)