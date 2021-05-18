
import {useState} from 'react'
import { connect } from 'react-redux'
import publicacionesActions from '../../redux/actions/publicacionesActions'

const CardFavorito = (props) =>{
    // const {categoria , descripcion , imagen , titulo , subtitulo } = props.publicacion
    // const [publicacionFaveada, setPublicacionFaveada] = useState(false)
    // const token = localStorage.getItem("token")

    // console.log(props)
    // return(
        // <div className="tarjetaFavoritos">
        // <div className="contenedorLink">
        //         <div className="bgPublicacion" style={{backgroundImage: `url(${imagen})`}}></div>
        // </div>
        //     <div className="contenidoPublicacion">
        //         <h1 style={{marginBottom:'1vh'}}>{titulo}</h1>
        //         <h2 style={{marginBottom:'1vh'}}>Categoria: {categoria}</h2>
        //         <p className="descripcion texto">{descripcion.slice(0,200)}</p>
        //         <div className="contenedorBotonesFavoritos">
        //             <h2 className="botonEliminarFavorito" onClick={()=>props.guardarPublicacion(props.publicacion._id, token)}>eliminar</h2>
        //         </div>
        //     </div>
        // </div>
    // )
}

const mapDispatchToProps = {
    guardarPublicacion: publicacionesActions.guardarPublicacion
}

export default connect(null, mapDispatchToProps)(CardFavorito)