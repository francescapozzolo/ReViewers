
import {Link} from 'react-router-dom'
import Valoracion from '../utilidades/Valoracion'


const PublicacionIndividual = ({publicacion}) => {

    const {_id , titulo , subtitulo , imagen , autor , descripcion} = publicacion
    let contenidoDescripcion = descripcion.slice(0,301)

    return(
        <>
        <div className="tarjetaPublicaciones">
                <div className="contenedorLink">
                    <Link to={`/publicacion/${publicacion._id}`}>
                        <div className="bgPublicacion" style={{backgroundImage: `url(${imagen})`}}></div>
                    </Link>
                </div>
                <div className="contenidoPublicacion">
                    <div>
                        <Link to={`/publicacion/${publicacion._id}`}><h2 className="titulosAlt">{titulo}</h2></Link>
                        <h3 className="titulosAlt">{subtitulo}</h3>
                        <p className="descripcion texto">{contenidoDescripcion}<Link to={`/publicacion/${publicacion._id}`}>... Ver mas!</Link></p>
                    </div>
                    <div className="valoracion">
                        {/* <Valoracion idPublicacion={_id} idUsuario={autor} /> */}
                        <p className="texto">{publicacion.comentarios.length} comentarios</p>
                    </div>
                </div>
        </div>
        </>
    )
}

export default PublicacionIndividual