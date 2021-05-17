import { useEffect, useState } from "react"
import {connect} from "react-redux"
import publicacionesActions from '../redux/actions/publicacionesActions'
// import { Icon, InlineIcon } from '@iconify/react';
import { Icon } from '@iconify/react';
// import bookmarkStar from '@iconify-icons/bi/bookmark-star';
// import { InlineIcon } from '@iconify/react';
// import bookmarkStarFill from '@iconify-icons/bi/bookmark-star-fill';
import trashIcon from '@iconify-icons/bi/trash';
import noteEditLine from '@iconify-icons/clarity/note-edit-line';
import {FiSend} from 'react-icons/fi'
import {MdSend} from 'react-icons/md'

const Comentarios = (props)=>{

   const {reseniaSeleccionada, cargarComentario, usuarioLogeado, editarComentario, eliminarComentario} = props
    
    const [reseniaComentarios, setReseniaComentarios] = useState([])
    const [nuevoComentario, setNuevoComentario] = useState("")
    const [estaEditando, setEstaEditando] = useState(false)
    const [comentarioEditado, setComentarioEditado] = useState('')
    const [comentarioEnEdicion, setComentarioEnEdicion] = useState('')

    useEffect(()=>{
        setReseniaComentarios(reseniaSeleccionada.comentarios)
        // eslint-disable-next-line
    }, [])
    
    const mandarComentario = async(mensaje)=>{
       if(usuarioLogeado) {
         if(nuevoComentario.length > 0) {
            setNuevoComentario('')
            const respuesta = await cargarComentario(reseniaSeleccionada._id, usuarioLogeado.token, mensaje)
            setReseniaComentarios(respuesta.comentarios)
         } else {
            alert('El mensaje esta vacio')
         }
      } else {
         alert('Debes estar logeado para comentar')
      }
    }

    const comenzarEdicion = (value, idComentario)=>{
        setComentarioEditado(value)
        setEstaEditando(!estaEditando)
        setComentarioEnEdicion(idComentario)
    }

    const mandarComentarioEditado = async(idComentarioModificado)=>{
       if(usuarioLogeado) {
          setEstaEditando(false)
          const respuesta = await editarComentario(idComentarioModificado, reseniaSeleccionada._id, comentarioEditado)
          setReseniaComentarios(respuesta)
       } else {
          alert('Debes estar logeado para editar un comentario')
       }
    }

    const borrarComentario = async(idComentario)=>{
        const respuesta = await eliminarComentario( reseniaSeleccionada._id, idComentario)
        setReseniaComentarios(respuesta)
    }

    return (
         <div className="resenia-comments-container">
            <h1 className="titulo-comentarios titulosAlt" >Comentarios!</h1>
            <div className="contenedor-general-comentarios flex flex-col">
               <div className="contenedor-de-comentarios mx-auto">
               
              {reseniaComentarios.map(comentario => {
                 return(
                    <div className={usuarioLogeado.mail === comentario.usuarioId.mail ? "comment commentOwner" : "comment"} key={comentario._id} >
                       <div className="comment-image" style={{backgroundImage: `url(${comentario.usuarioId.imagen})`}}></div>
                       <div className={usuarioLogeado.mail === comentario.usuarioId.mail ? "comment-content-container comment-content-container-owner" : "comment-content-container"}>
                          <div>
                           <p className="titulosAlt campoMensaje" >{comentario.usuarioId.nombre} {comentario.usuarioId.apellido} </p>
                           <div className="comment-content">
                              <div className="campoMensaje">
                                 <p className={comentarioEnEdicion === comentario._id
                                    ? estaEditando 
                                          ? "displayNone" : "" 
                                    : ""}>{comentario.mensaje}</p>
                                 
                                    <textarea id="textareaEditarComentario" type="text" value={comentarioEditado} onChange={(e)=>setComentarioEditado(e.target.value)}
                                    className={ comentarioEnEdicion === comentario._id ? estaEditando ? "editing-textarea" : "displayNone" : "displayNone"}></textarea>
                                    {/* <MdSend className={comentarioEnEdicion === comentario._id ? estaEditando ? "editing-sendIcon" : "displayNone" : "displayNone"} onClick={()=>mandarComentarioEditado(comentario._id)} /> */}
                              </div>
                              <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>mandarComentarioEditado(comentario._id)} className={comentarioEnEdicion === comentario._id ? estaEditando ? "editing-sendIcon cerrarEditar" : "displayNone" : "displayNone"} viewBox="0 0 20 20" fill="currentColor">
                                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                           </div>
                          </div>
                       </div>
                        
                        {usuarioLogeado.mail === comentario.usuarioId.mail &&
                           <div className="icons-container">
                              {
                                 !estaEditando
                                 ?
                                 <Icon icon={noteEditLine} onClick={()=>comenzarEdicion(comentario.mensaje, comentario._id)} className="modifyComment-icon" />
                                 :
                                 <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>comenzarEdicion(comentario.mensaje, comentario._id)} className="cerrarEditar" viewBox="0 0 20 20" fill="currentColor">
                                     <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                 </svg>
                              }
                              <Icon icon={trashIcon} onClick={()=>borrarComentario(comentario._id)} className="deleteComment-icon" />
                           </div>
                        }
                    </div>)
              })}



           </div>
            <div className="send-message-container  justify-center">
               {
                  
                  <div className="flex flex-row mx-auto">
                     <input type="text" className="input-comentar" value={nuevoComentario} onChange={e => setNuevoComentario(e.target.value)} placeholder="Dejanos tu opinion!" />
                     <FiSend className="send-icon" onClick={()=>mandarComentario(nuevoComentario)} />

                  </div>
                  
               
               }
            </div>
        </div>
     </div>
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
   editarComentario: publicacionesActions.editarComentario,
   eliminarComentario: publicacionesActions.eliminarComentario
}

export default connect(mapStateToProps, mapDispatchToProps)(Comentarios)