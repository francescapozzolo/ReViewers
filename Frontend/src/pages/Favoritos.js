import { connect } from 'react-redux'
import axios from 'axios'
import {useState , useEffect} from 'react'
import CardFavorito from '../components/utilidades/CardFavorito'
import publicacionesActions from '../redux/actions/publicacionesActions'
import { Icon, InlineIcon } from '@iconify/react';
import trashIcon from '@iconify-icons/bpmn/trash';
import {Link} from 'react-router-dom'


const Favoritos =(props)=>{
    const [todasLasPublicaciones , setTodasPublicaciones] = useState([])
    
    // const {categoria , descripcion , imagen , titulo , subtitulo } = props.publicacion
    const [publicacionFaveada, setPublicacionFaveada] = useState(false)
    const token = localStorage.getItem("token")


    useEffect(()=>{
        console.log(props)
        const fetch = async()=>{
            const respuesta = await props.obtenerFavoritos()
            setTodasPublicaciones(respuesta.publicacionesGuardadas)
        }
        fetch()
    },[])


    const quitarPublicacion = (idPublicacion, token)=>{
        setTodasPublicaciones(todasLasPublicaciones.filter(publicacion =>{
            return publicacion._id !== idPublicacion
        }))
        props.guardarPublicacion(idPublicacion, token)


    }


    return(
            <div className="contenedor-tituloDeResenia">
                <h1 className="TituloFavoritos titulosAlt">Aqui se muestran tus favoritos!</h1>
                <div className="GridPublic">
                    {todasLasPublicaciones.map((publicacion,index) => {
                        return(
                            <div className="tarjetaFavoritos" key={index*2}>
                                {/* <Link to={`/publicacion/${publicacion._id}`}> */}
                                    <div className="contenedorLink">
                                            <div className="bgPublicacion" style={{backgroundImage: `url(${publicacion.imagen})`}}></div>
                                    </div>
                                    <div className="contenidoPublicacion">
                                        <h1 className="favoritos-titulo titulosAlt">{publicacion.titulo}</h1>
                                        {/* <p className="descripcion texto">{publicacion.descripcion.slice(0,200)}</p> */}
                                        <div className="contenedorBotonesFavoritos">
                                            <h2 className="favoritos-categoria titulosAlt" >Categoria: {publicacion.categoria}</h2>
                                            {/* <h2 className="botonEliminarFavorito" onClick={()=>quitarPublicacion(publicacion._id, token)}>eliminar</h2> */}
                                            <Icon icon={trashIcon} onClick={()=>quitarPublicacion(publicacion._id, token)} className="icono-borrarFavorito" />
                                        </div>
                                    </div>
                                {/* </Link> */}
                            </div>
                        )
                    })}
                </div>
            </div>
    )
}

const mapDispatchToProps = {
    obtenerFavoritos: publicacionesActions.obtenerFavoritos,
    guardarPublicacion: publicacionesActions.guardarPublicacion
}


export default connect (null , mapDispatchToProps)(Favoritos)