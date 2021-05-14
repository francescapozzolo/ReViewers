import React from 'react';
import Rating from '@material-ui/lab/Rating';
import publicacionesActions from '../../redux/actions/publicacionesActions'
import {connect} from 'react-redux'

const Valoracion = ({cargarValoracion, idPublicacion, idUsuario})=> {
   return <Rating name={"rating"} onChange={(e, value) => cargarValoracion(idPublicacion, {idUsuario, valoracion: value})}  /> 
}


const mapDispatchToProps = {
   cargarValoracion: publicacionesActions.cargarValoracion,
   cargarLike: publicacionesActions.cargarLike
}

export default connect(null, mapDispatchToProps)(Valoracion)
