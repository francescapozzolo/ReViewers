import { useEffect, useState } from "react"
import {connect} from "react-redux"
import Valoracion from "../components/utilidades/Valoracion"
import publicacionesActions from '../redux/actions/publicacionesActions'

import Rating from '@material-ui/lab/Rating';
import bookmarkStar from '@iconify-icons/bi/bookmark-star';
import trashIcon from '@iconify-icons/bi/trash';
import noteEditLine from '@iconify-icons/clarity/note-edit-line';
import {FiSend} from 'react-icons/fi'

import Comentarios from '../components/Comentarios'
import GuardarPublicacion from '../components/utilidades/GuardarPublicacion'

import { Icon, InlineIcon } from '@iconify/react';
import bookmarkStarFill from '@iconify-icons/bi/bookmark-star-fill';


const Resenia = (props)=>{

   const [reseniaSeleccionada, setReseniaSeleccionada] = useState({})
   useEffect(()=>{
      const fetch = async ()=>{
         const idResenia = props.match.params.id
         if(props.todasLasPublicaciones.length > 0){
         setReseniaSeleccionada(props.todasLasPublicaciones.find(publicacion => JSON.stringify(publicacion._id) === JSON.stringify(idResenia)))
      } else {
         const respuesta = await props.obtenerUnaPublicacion(idResenia)
         setReseniaSeleccionada(respuesta)
      }
   }
   fetch()
   // eslint-disable-next-line
   }, [])      
   console.log(reseniaSeleccionada)
   
   return(
      <>
         <div className="contenedor-tituloDeResenia">
            <div className="imagen-de-categoria" style={{backgroundImage: `url('/assets/caratulas/${
               reseniaSeleccionada.categoria === "tecnologia" ? "tecnologia.jpg":
               reseniaSeleccionada.categoria === "entretenimiento" ? "entretenimiento.jpg":
               reseniaSeleccionada.categoria === "deportes" ? "deportes.jpg":
               reseniaSeleccionada.categoria === "gastronomia" && "gastronomia.jpg"
                }')`
            }}></div>
            <h3 className="titulo-de-resenia titulosAlt">{reseniaSeleccionada.titulo}</h3>

         </div>

         <section className="resenia-section">
            <div className="reseniaSection-topContainer">
               <div className="contenedor-de-foto-de-resenia" style={{background: `url(${reseniaSeleccionada.imagen})`}} ></div>
               <div className="reseniaSection-right">
                  <div className="valorar-container">

                     <p className="titulosAlt">Valorar</p>            
                     {reseniaSeleccionada.valoraciones && <Valoracion reseniaSeleccionada={reseniaSeleccionada} />}
                  </div>
                  <h4 className="titulosAlt subtitulo-resenia">{reseniaSeleccionada.subtitulo}</h4>
                  <div className="reseniaText-container">
                     <p className="descripcion-resenia texto">{reseniaSeleccionada.descripcion}</p>
                  </div>
               </div>
            </div>

            {reseniaSeleccionada.usuariosFav && <GuardarPublicacion reseniaSeleccionada={reseniaSeleccionada} />}

            {reseniaSeleccionada.usuariosFav && <GuardarPublicacion reseniaSeleccionada={reseniaSeleccionada} />}
            {/* <div> */}
               {/* <h1 className="titulo-comentarios titulosAlt" >Comentarios!</h1> */}
               {reseniaSeleccionada.comentarios && <Comentarios reseniaSeleccionada={reseniaSeleccionada} />}
            {/* </div> */}
         </section>


      </>
   )
}

const mapStateToProps = (state)=>{
   return {
      todasLasPublicaciones: state.publicacionReducer.todasLasPublicaciones,
      usuarioLogeado: state.authReducer.usuarioLogeado
   }
}

const mapDispatchToProps = {
   obtenerUnaPublicacion: publicacionesActions.obtenerUnaPublicacion,
   cargarComentario: publicacionesActions.cargarComentario,
   guardarPublicacion: publicacionesActions.guardarPublicacion,
   publicacionFueGuardada: publicacionesActions.publicacionFueGuardada,
   cargarValoracion: publicacionesActions.cargarValoracion,
   publicacionFueValorada: publicacionesActions.publicacionFueValorada
}

export default connect(mapStateToProps, mapDispatchToProps)(Resenia)