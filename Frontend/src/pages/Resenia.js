import { useEffect, useState } from "react"
import {connect} from "react-redux"
import Valoracion from "../components/utilidades/Valoracion"
import publicacionesActions from '../redux/actions/publicacionesActions'
import Rating from '@material-ui/lab/Rating';
import { Icon, InlineIcon } from '@iconify/react';
import bookmarkStar from '@iconify-icons/bi/bookmark-star';
// import { InlineIcon } from '@iconify/react';
import bookmarkStarFill from '@iconify-icons/bi/bookmark-star-fill';
import trashIcon from '@iconify-icons/bi/trash';
import noteEditLine from '@iconify-icons/clarity/note-edit-line';
import {FiSend} from 'react-icons/fi'
import Comentarios from '../components/Comentarios'

const Resenia = (props)=>{

   const [reseniaSeleccionada, setReseniaSeleccionada] = useState({})
   const [publicacionFaveada, setPublicacionFaveada] = useState(false)
   const [todosComentarios, setTodosComentarios] = useState(null)
   const [nuevoComentario, setNuevoComentario] = useState(null)

   useEffect(async()=>{
      const idResenia = props.match.params.id
      
      if(props.todasLasPublicaciones.length > 0){
         setReseniaSeleccionada(props.todasLasPublicaciones.find(publicacion => JSON.stringify(publicacion._id) === JSON.stringify(idResenia)))
      } else {
         const respuesta = await props.obtenerUnaPublicacion(idResenia)
         setReseniaSeleccionada(respuesta)
      }
   }, [])   
   
   return(
      <>
         <div className="contenedor-tituloDeResenia">
            <div className="imagen-de-categoria" style={{backgroundImage: `url(${reseniaSeleccionada.imagen})`}}></div>
            <h3 className="titulo-de-resenia titulosAlt">{reseniaSeleccionada.titulo}</h3>
         </div>

         <section className="resenia-section">
            {/* <div className="seccion-resenia-contenedor-general"> */}

            <div className="reseniaSection-topContainer">
               <div className="contenedor-de-foto-de-resenia" style={{background: `url(${reseniaSeleccionada.imagen})`}} ></div>

               <div className="reseniaSection-right">
                  <div className="valorar-container">
                     <p className="titulosAlt">Valorar</p>
                     <Rating name={"rating"} style={{fontSize:"40px"}} />
                     </div>
                     <h4 className="titulosAlt subtitulo-resenia">{reseniaSeleccionada.subtitulo}</h4>
                  <div className="reseniaText-container">
                     <p className="descripcion-resenia texto">{reseniaSeleccionada.descripcion}</p>
                  </div>
               </div>
            </div>
            <Icon icon={bookmarkStar} className={publicacionFaveada ? "displayNone" : "icono-guardar"} 
            onClick={() => setPublicacionFaveada(!publicacionFaveada)}  />
            <Icon icon={bookmarkStarFill} className={publicacionFaveada ? "icono-guardar" : "displayNone"} 
            onClick={() => setPublicacionFaveada(!publicacionFaveada)} />

            {/* COMMENTARIOS */}
            {
               reseniaSeleccionada.comentarios &&
               <Comentarios reseniaSeleccionada={reseniaSeleccionada} />
            }
               

            {/* <div className="send-message-container">
               <input type="text" className="input-comentar" onChange={e => setNuevoComentario(e.target.value)} placeholder="Dejanos tu opinion!" />
               <FiSend className="send-icon" onClick={()=>mandarComentario(nuevoComentario)} />
            </div> */}
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
   cargarComentario: publicacionesActions.cargarComentario
}

export default connect(mapStateToProps, mapDispatchToProps)(Resenia)