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

const Resenia = (props)=>{

   const [reseniaSeleccionada, setReseniaSeleccionada] = useState({})
   const [publicacionFaveada, setPublicacionFaveada] = useState(false)
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
   // console.log(reseniaSeleccionada.comentarios)
   
   // console.log(reseniaSeleccionada)
   
   
   const mandarComentario = (mensaje)=>{
      props.cargarComentario(reseniaSeleccionada._id, props.usuarioLogeado.token, mensaje)
      // console.log(contenidoDelComentario)
   }



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

               {/* COMMENTS */}
               <div className="resenia-comments-container">
                  <div className="contenedor-general-comentarios">
                     <div className="contenedor-de-comentarios">
                        
                        {/* Hardcodeado */}
                        <div className="comment">
                           <div className="comment-image" style={{backgroundImage: `url(https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2018/07/31/15330606597383.jpg)`}}></div>
                           <div className="comment-content-container">
                              <p className="titulosAlt" >Nombre Usuario</p>
                              <div className="comment-content">
                                 <p>cualquier cosa que algun usuario pueda poner tengo que escribir .</p>
                              </div>
                           </div>
                           <div className="icons-container">
                              <Icon icon={noteEditLine} className="modifyComment-icon" />
                              <Icon icon={trashIcon} className="deleteComment-icon" />
                           </div>
                        </div>     

                        <div className="comment">
                           <div className="comment-image" style={{backgroundImage: `url(https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2018/07/31/15330606597383.jpg)`}}></div>
                           <div className="comment-content-container">
                              <p className="titulosAlt" >Nombre Usuario</p>
                              <div className="comment-content">
                                 <p>cualquier cosa que algun usuario pueda poner tengo que escribir .</p>
                              </div>
                           </div>
                           <div className="icons-container">
                              <Icon icon={noteEditLine} className="modifyComment-icon" />
                              <Icon icon={trashIcon} className="deleteComment-icon" />
                           </div>
                        </div> 

                        {/* Dinamico papu */}
                        {/* {reseniaSeleccionada.comentarios && console.log('hola')} */}

                        {/* {reseniaSeleccionada.comentarios.map(comentario => {
                           <div className="comment">
                              <div className="comment-image" style={{backgroundImage: `url(${comentario.usuarioId.imagen})`}}>hola</div>
                              <div className="comment-content-container">
                                 <p className="titulosAlt" >{comentario.titulo}</p>
                                 <div className="comment-content">
                                    <p>cualquier cosa que algun usuario pueda poner tengo que escribir cosas random porque si copio y pego el mismo texto por ahi se acomoda en todas las lineas iguales, pero si hago asi poniendo palabras al azar queda mejorcopio y pego el mismo texto por ahi se acomoda en todas las lineas iguales, pero si hago asi poniendo palabras al azar queda mejor.</p>
                                 </div>
                              </div>
                              <div className="icons-container">
                                 <Icon icon={noteEditLine} className="modifyComment-icon" />
                                 <Icon icon={trashIcon} className="deleteComment-icon" />
                              </div>
                           </div>
                        })} */}


                        
                     </div>
                  </div>
                  <div className="send-message-container">
                     <input type="text" className="input-comentar" onChange={e => setNuevoComentario(e.target.value)} placeholder="Dejanos tu opinion!" />
                     <FiSend className="send-icon" onClick={()=>mandarComentario(nuevoComentario)} />
                  </div>
               </div>
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
   cargarComentario: publicacionesActions.cargarComentario
}

export default connect(mapStateToProps, mapDispatchToProps)(Resenia)