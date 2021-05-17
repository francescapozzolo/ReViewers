import React, { useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';
import publicacionesActions from '../../redux/actions/publicacionesActions'
import {connect} from 'react-redux'
import {useState} from 'react'

const Valoracion = ({cargarValoracion, usuarioLogeado, reseniaSeleccionada, publicacionFueValorada})=> {
   
   const [valoracionInicial, setValoracionInicial] = useState(2)

   useEffect(()=>{
      const fetch = async ()=>{
         const respuesta = await publicacionFueValorada(reseniaSeleccionada._id, usuarioLogeado.token)
         console.log(respuesta)
         setValoracionInicial(respuesta.valoracion)
      }
      fetch()
      // eslint-disable-next-line
   }, [])

   const funcionCargarValoracion = async(valor)=>{
      setValoracionInicial(valor)
      await cargarValoracion(reseniaSeleccionada._id, {valoracion: valor}, usuarioLogeado.token)
   }
   
   return (
      <Rating name={"rating"} precision={.5} value={valoracionInicial ? valoracionInicial : 1} style={{fontSize:"40px"}}
         onChange={(e, value) => funcionCargarValoracion(value)}  />       
   ) 
}


const mapStateToProps = (state)=>{
   return {
      usuarioLogeado: state.authReducer.usuarioLogeado
   }
}

const mapDispatchToProps = {
   cargarValoracion: publicacionesActions.cargarValoracion,
   publicacionFueValorada: publicacionesActions.publicacionFueValorada
}

export default connect(mapStateToProps, mapDispatchToProps)(Valoracion)
