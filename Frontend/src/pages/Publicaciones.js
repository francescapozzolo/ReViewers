import {connect} from 'react-redux'
import React , {useEffect , useState} from 'react'
import publicacionesActions from '../redux/actions/publicacionesActions'
import PublicacionIndividual from '../components/utilidades/PublicacionIndividual'
import Loader from 'react-loader-spinner'


const Publicaciones = (props)=>{
   
    useEffect(()=>{
       props.todasPublicaciones()
       console.log(props)
    },[])
    if(props.publicaciones.length == 0){
        return(
            <div className="contenedorLoader">
                <Loader
                    type="Puff"
                    color="#161c26"
                    secondaryColor="#161c26"
                    height={450}
                    width={450}
                    timeout={3000} //3 secs
                />
            </div>
        )
    }
    return(
        <>
        <h1>Categoria:{null}</h1>
        <div className="contenedorPublic">
            {props.publicaciones.map((publicacion , index)=>{
                return(
                    <PublicacionIndividual publicacion={publicacion}/>
                )
            })}
        </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        publicaciones: state.publicacionReducer.todasLasPublicaciones
    }
}
const mapDispatchToProps = {
    todasPublicaciones: publicacionesActions.obtenerTodasPublicaciones
}

export default connect(mapStateToProps , mapDispatchToProps)(Publicaciones)