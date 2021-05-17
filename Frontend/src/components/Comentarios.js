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

const Comentarios = ({reseniaSeleccionada, cargarComentario, usuarioLogeado, editarComentario, eliminarComentario})=>{
    
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
         if(nuevoComentario && nuevoComentario !== ""){
             setNuevoComentario(' ')
             const respuesta = await cargarComentario(reseniaSeleccionada._id, usuarioLogeado.token, mensaje)
             setReseniaComentarios(respuesta.comentarios)
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

   //  console.log(reseniaSeleccionada)
   console.log(reseniaComentarios)
    return (
         <div className="resenia-comments-container">
            <h1 className="titulo-comentarios titulosAlt" >Comentarios!</h1>
            <div className="contenedor-general-comentarios">
               <div className="contenedor-de-comentarios">
               
              {reseniaComentarios.map(comentario => {
                 return(
                    <div className="comment" key={comentario._id} >
                       <div className="comment-image" style={{backgroundImage: `url(${comentario.usuarioId.imagen})`}}></div>
                       <div className="comment-content-container">
                          <p className="titulosAlt" >{comentario.usuarioId.nombre} {comentario.usuarioId.apellido} </p>
                          <div className="comment-content">
                             <p className={comentarioEnEdicion === comentario._id
                                ? estaEditando 
                                    ? "displayNone" : "" 
                                : ""}>{comentario.mensaje}</p>
                             
                             
                             <textarea value={comentarioEditado} onChange={(e)=>setComentarioEditado(e.target.value)}
                             className={ comentarioEnEdicion === comentario._id ? estaEditando ? "editing-textarea" : "displayNone" : "displayNone"}></textarea>
                             <MdSend className={comentarioEnEdicion === comentario._id ? estaEditando ? "editing-sendIcon" : "displayNone" : "displayNone"} onClick={()=>mandarComentarioEditado(comentario._id)} />
                          </div>
                       </div>
                        
        
                        {console.log(comentario.usuarioId.mail) }
                        {usuarioLogeado.mail === comentario.usuarioId.mail &&
                           <div className="icons-container">
                           <Icon icon={noteEditLine} onClick={()=>comenzarEdicion(comentario.mensaje, comentario._id)} className="modifyComment-icon" />
                           <Icon icon={trashIcon} onClick={()=>borrarComentario(comentario._id)} className="deleteComment-icon" />
                           </div>
                        }
                    </div>)
              })}


            <div className="send-message-container">
               {
                  <>
                  <input type="text" className="input-comentar" value={nuevoComentario} onChange={e => setNuevoComentario(e.target.value)} placeholder="Dejanos tu opinion!" />
                  <FiSend className="send-icon" onClick={()=>mandarComentario(nuevoComentario)} />
                  </>
               
               }
            </div>

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