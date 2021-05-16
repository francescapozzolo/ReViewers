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
import GuardarPublicacion from '../components/utilidades/GuardarPublicacion'
// import Valoracion from '../components/utilidades/Valoracion'

const Resenia = (props)=>{

   const [reseniaSeleccionada, setReseniaSeleccionada] = useState({})
   // const [publicacionFaveada, setPublicacionFaveada] = useState(null)
   const [todosComentarios, setTodosComentarios] = useState('')
   const [nuevoComentario, setNuevoComentario] = useState('')
   // const [valoracionInicial, setValoracionInicial] = useState(0)

   useEffect(async()=>{
      const idResenia = props.match.params.id
      
      if(props.todasLasPublicaciones.length > 0){
         setReseniaSeleccionada(props.todasLasPublicaciones.find(publicacion => JSON.stringify(publicacion._id) === JSON.stringify(idResenia)))
      } else {
         const respuesta = await props.obtenerUnaPublicacion(idResenia)
         setReseniaSeleccionada(respuesta)
      }

      // const respuesta = await publicacionFueValorada() 
   }, [])   

   
   return(
      <>
         <div className="contenedor-tituloDeResenia">
            <div className="imagen-de-categoria" style={{backgroundImage: `url(${reseniaSeleccionada.imagen})`}}></div>
            <h3 className="titulo-de-resenia titulosAlt">{reseniaSeleccionada.titulo}</h3>
         </div>

         <section className="resenia-section">
            <div className="reseniaSection-topContainer">
               <div className="contenedor-de-foto-de-resenia" style={{background: `url(${reseniaSeleccionada.imagen})`}} ></div>
               <div className="reseniaSection-right">
                  <div className="valorar-container">
                     <p className="titulosAlt">Valorar</p>
                  
                  {   reseniaSeleccionada.valoraciones && <Valoracion reseniaSeleccionada={reseniaSeleccionada} />}
                     {/* <Rating name={"rating"} value={valoracionInicial} style={{fontSize:"40px"}}
                        onChange={(e, value) => props.cargarValoracion(reseniaSeleccionada._id, {valoracion: value}, props.usuarioLogeado.token)} /> */}
                  
                  </div>
                  <h4 className="titulosAlt subtitulo-resenia">{reseniaSeleccionada.subtitulo}</h4>
                  <div className="reseniaText-container">
                     <p className="descripcion-resenia texto">{reseniaSeleccionada.descripcion}</p>
                  </div>
               </div>
            </div>

            {reseniaSeleccionada.usuariosFav && <GuardarPublicacion reseniaSeleccionada={reseniaSeleccionada} />}

            {/* COMMENTARIOS */}
            { reseniaSeleccionada.comentarios && <Comentarios reseniaSeleccionada={reseniaSeleccionada} />}
         
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