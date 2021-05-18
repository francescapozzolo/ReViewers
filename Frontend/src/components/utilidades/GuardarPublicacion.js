import { useEffect, useState } from "react"
import {connect} from "react-redux"
import { Icon } from '@iconify/react';
import bookmarkStar from '@iconify-icons/bi/bookmark-star';
import bookmarkStarFill from '@iconify-icons/bi/bookmark-star-fill';

import publicacionesActions from '../../redux/actions/publicacionesActions'

const GuardarPublicacion = (props)=>{
    
    const [publicacionFaveada, setPublicacionFaveada] = useState(false)


    useEffect(()=>{
        const fetch = async ()=>{
            const respuesta = await props.publicacionFueGuardada(props.reseniaSeleccionada._id, props.usuarioLogeado.token)
            setPublicacionFaveada(respuesta.data.usuarioYaGuardoPublicacion)
        }
        fetch()
        // eslint-disable-next-line
    },[])

    const funcionGuardarPublicacion = async ()=>{
        if(props.usuarioLogeado) {
            setPublicacionFaveada(!publicacionFaveada)
            props.guardarPublicacion(props.reseniaSeleccionada._id, props.usuarioLogeado.token)
        } else {
            alert('Debes estar logeado para guardar una publicacion')
        }
     }
    
    return( 
        <>
            <Icon icon={publicacionFaveada ? bookmarkStarFill : bookmarkStar } className={"icono-guardar"} 
            onClick={() => funcionGuardarPublicacion()}  />
            
        </>
    )
}

const mapStateToProps = (state)=>{
    return {
        usuarioLogeado: state.authReducer.usuarioLogeado
    }
}
 
 const mapDispatchToProps = {
    guardarPublicacion: publicacionesActions.guardarPublicacion,
    publicacionFueGuardada: publicacionesActions.publicacionFueGuardada,
 }

export default  connect(mapStateToProps, mapDispatchToProps)(GuardarPublicacion)