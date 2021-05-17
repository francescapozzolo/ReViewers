import { connect } from 'react-redux'
import axios from 'axios'
import {useState , useEffect} from 'react'
import CardFavorito from '../components/utilidades/CardFavorito'

const Favoritos =(props)=>{

    const [todasLasPublicaciones , setTodasPublicaciones] = useState([])
    useEffect(()=>{
        const publicaciones = axios.get('http://localhost:4000/api/publicaciones')
        .then(result => setTodasPublicaciones(result.data.respuesta))
    },[])

    return(
        <>
        <div className="contenedor-tituloDeResenia">
            <h1 className="TituloFavoritos titulosAlt">Aqui se muestran tus favoritos!</h1>
            <div className="GridPublic">
                {
                todasLasPublicaciones.map((publicacion,index) => {
                    return(
                        <CardFavorito key={index*2} publicacion={publicacion} />
                    )
                    })
                }
            </div>
        </div>
        </>
    )
}
/*
const mapStateToProps = state =>{
    return {
        todosLosFavoritos: state.favoritosReducer.favoritos
    }
}

const mapDispatchToProps = {
    cargarFavoritos: favoritosActions.cargarFavoritos,
    eliminarFavorito: favoritosActions.borrarFavorito
}*/


export default connect (null , null)(Favoritos)