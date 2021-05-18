import { connect } from 'react-redux'
import {useState , useEffect} from 'react'
import publicacionesActions from '../redux/actions/publicacionesActions'
 // eslint-disable-next-line 
import { Icon, InlineIcon } from '@iconify/react';
import trashIcon from '@iconify-icons/bpmn/trash';
import {Link} from 'react-router-dom'


const Favoritos =(props)=>{
    const [todasLasPublicaciones , setTodasPublicaciones] = useState()
    const token = localStorage.getItem("token")

    useEffect(()=>{
        window.scroll({
            top: 0,
            left: 0,
          })
        const fetch = async()=>{
            const respuesta = await props.obtenerFavoritos()
            setTodasPublicaciones(respuesta.publicacionesGuardadas)
        }
        fetch()
         // eslint-disable-next-line 
    },[])

    const quitarPublicacion = (idPublicacion, token)=>{
        setTodasPublicaciones(todasLasPublicaciones.filter(publicacion =>{
            return publicacion._id !== idPublicacion
        }))
        props.guardarPublicacion(idPublicacion, token)

    }
    if(!todasLasPublicaciones){
        return <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>
    }
    return(
        <main id="favoritos">
            <div className="imagen-de-categoria" style={{backgroundImage: "url('/assets/caratulas/bgTodasPublicaciones.jpg')"}}></div>
            <h1 className="tituloFavoritos titulosAlt pagFavTit" >Aqui se muestran tus favoritos!</h1>
            
            
            <div className="favoritos">
                { todasLasPublicaciones.map((publicacion,index) => {
                    
                    return(
                        <div className="tarjetaFavoritos" key={index*2}>
                                    <div className="contenedorLinkFav">
                                <Link to={`/publicacion/${publicacion._id}`}>
                                            <div className="bgPublicacion" style={{backgroundImage: `url(${publicacion.imagen})`}}></div>
                                </Link>

                                    </div>
                                    <div className="contenidoPublicacionFav ">
                                <Link to={`/publicacion/${publicacion._id}`}>
                                        <h2 className="favoritos-titulo titulosAlt">{publicacion.titulo}</h2>
                                </Link>
                                        {/* <p className="descripcion texto">{publicacion.descripcion.slice(0,200)}</p> */}
                                        <div className="contenedorBotonesFavoritos">
                                            <h2 className="favoritos-categoria titulosAlt" >Categoria: {publicacion.categoria}</h2>
                                            {/* <h2 className="botonEliminarFavorito" onClick={()=>quitarPublicacion(publicacion._id, token)}>eliminar</h2> */}
                                            <Icon icon={trashIcon} onClick={()=>quitarPublicacion(publicacion._id, token)} className="icono-borrarFavorito" />
                                        </div>
                                    </div>
                            </div>
                        )

                    })
                
                }
                </div>
            </main>

    )
}

const mapDispatchToProps = {
    obtenerFavoritos: publicacionesActions.obtenerFavoritos,
    guardarPublicacion: publicacionesActions.guardarPublicacion
}


export default connect (null , mapDispatchToProps)(Favoritos)