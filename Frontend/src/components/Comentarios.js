import { useEffect, useState } from "react"
import {connect} from "react-redux"
import publicacionesActions from '../redux/actions/publicacionesActions'
import { Icon, InlineIcon } from '@iconify/react';
import bookmarkStar from '@iconify-icons/bi/bookmark-star';
// import { InlineIcon } from '@iconify/react';
import bookmarkStarFill from '@iconify-icons/bi/bookmark-star-fill';
import trashIcon from '@iconify-icons/bi/trash';
import noteEditLine from '@iconify-icons/clarity/note-edit-line';
import {FiSend} from 'react-icons/fi'
import {MdSend} from 'react-icons/md'

const Comentarios = ({reseniaSeleccionada, cargarComentario, usuarioLogeado})=>{
    
    const [reseniaComentarios, setReseniaComentarios] = useState([])
    const [nuevoComentario, setNuevoComentario] = useState('')
    const [estaEditando, setEstaEditando] = useState(false)
    const [comentarioEditado, setComentarioEditado] = useState('')

    useEffect(()=>{
        setReseniaComentarios(reseniaSeleccionada.comentarios)
    }, [])
    
    const mandarComentario = async(mensaje)=>{
        if(nuevoComentario !== ' '){
            setNuevoComentario(' ')
            const respuesta = await cargarComentario(reseniaSeleccionada._id, usuarioLogeado.token, mensaje)
            setReseniaComentarios(respuesta.comentarios)
        }
    }

    const mandarComentarioEditado = ()=>{
        console.log(nuevoComentario)
        setNuevoComentario('')
        setEstaEditando(false)
    }

    const comenzarEdicion = (value)=>{
        setComentarioEditado(value)
        setEstaEditando(!estaEditando)
    }



    // console.matu
    return (
        
        <div className="resenia-comments-container">
        <div className="contenedor-general-comentarios">
           <div className="contenedor-de-comentarios">

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


              {reseniaComentarios.map(comentario => {
                 return(
                    <div className="comment" key={comentario._id} >
                       <div className="comment-image" style={{backgroundImage: `url(${comentario.usuarioId.imagen})`}}></div>
                       <div className="comment-content-container">
                          <p className="titulosAlt" >{comentario.usuarioId.nombre} {comentario.usuarioId.apellido} </p>
                          <div className="comment-content">
                             <p className={estaEditando ? "displayNone" : ""}>{comentario.mensaje}</p>
                             <textarea value={comentarioEditado} onChange={(e)=>setComentarioEditado(e.target.value)} className={estaEditando ? "editing-textarea" : "displayNone"}></textarea>
                             <MdSend className={estaEditando ? "editing-sendIcon" : "displayNone"} onClick={()=>mandarComentarioEditado()} />
                          </div>
                       </div>
                       <div className="icons-container">
                          <Icon icon={noteEditLine} onClick={()=>comenzarEdicion(comentario.mensaje)} className="modifyComment-icon" />
                          <Icon icon={trashIcon} className="deleteComment-icon" />
                       </div>
                    </div>)
              })}


            <div className="send-message-container">
               <input type="text" className="input-comentar" value={nuevoComentario} onChange={e => setNuevoComentario(e.target.value)} placeholder="Dejanos tu opinion!" />
               <FiSend className="send-icon" onClick={()=>mandarComentario(nuevoComentario)} />
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
   cargarComentario: publicacionesActions.cargarComentario
}

export default connect(mapStateToProps, mapDispatchToProps)(Comentarios)