import publicacionesActions from '../../redux/actions/publicacionesActions'
import {connect} from 'react-redux'
import {AiOutlineLike} from 'react-icons/ai'
import {AiFillLike} from 'react-icons/ai'
import {useState} from 'react'


const MeGusta = ({idPublicacion, idUsuario, cargarLike})=> {
   const [estaLikeado, setEstaLikeado] = useState(null) 
   const [totalDeLikes, setTotalDeLikes] = useState(null)

   const funcionCargarLike = async(param1, param2)=>{
      const respuesta = await cargarLike(param1, param2)
      setTotalDeLikes(respuesta.totalDeLikes)
      setEstaLikeado(respuesta.usuarioYaLikio)
      // Para hacerlo mas dinamico, establecer el estado del estaLikeado en el componentDidMount y
      // en esta funcion hacer la siguiente linea, eso para no tener q esperar la res para cambiar el estado del boton 
      // setEstaLikeado(!estaLikeado)
   }

   return (
      <div style={{display: 'flex', alignItems:'center'}}>
         <h3>{totalDeLikes}</h3>
         <AiOutlineLike className={!estaLikeado ? "icono-meGusta" : "displayNone"} onClick={()=>funcionCargarLike(idPublicacion, idUsuario)} />
         <AiFillLike className={estaLikeado ? "icono-meGustaActivo" : "displayNone"} onClick={()=>funcionCargarLike(idPublicacion, idUsuario)} />
      </div>
   )
}

const mapDispatchToProps = {
   cargarLike: publicacionesActions.cargarLike
}

export default connect(null, mapDispatchToProps)(MeGusta)