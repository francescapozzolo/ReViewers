import {Link} from 'react-router-dom'
import Valoracion from '../utilidades/Valoracion'

const PublicacionIndividual = ({publicacion}) => {
    //console.log('soy publicacion individual' , publicacion)
    const {_id , titulo , subtitulo , imagen , autor , descripcion} = publicacion
    let contenidoDescripcion = descripcion.slice(0,201)
    //console.log(contenidoDescripcion)
    return(
        <>
        <div className="tarjetaPublicaciones">
                <div className="contenedorLink">
                    <Link to={`/publicacion/${_id}`}>
                        <div className="bgPublicacion" style={{backgroundImage: `url(${imagen})`}}></div>
                    </Link>
                </div>
                <div className="contenidoPublicacion">
                    <Link to={`/publicacion/${_id}`}><h1>{titulo}</h1></Link>
                    <div className="espacio"><h3>{subtitulo}</h3></div>
                    <div className="descripcion"><p>{contenidoDescripcion}
                    <br></br>
                    <Link to={`/publicacion/${_id}`}>... Ver mas!</Link></p></div>
                    <div className="valoracion"><Valoracion idPublicacion={_id} idUsuario={autor} /></div>
                </div>
        </div>
        </>
    )
}

export default PublicacionIndividual