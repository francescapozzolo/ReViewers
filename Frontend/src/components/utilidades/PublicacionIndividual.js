
import {Link} from 'react-router-dom'
import { Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';


const PublicacionIndividual = ({publicacion}) => {
    console.log(publicacion)
// eslint-disable-next-line
    const {_id , titulo , subtitulo , imagen , autor , descripcion} = publicacion
    let contenidoDescripcion = descripcion.slice(0,301)

    return(
        <>
        <div className="tarjetaPublicaciones">
                <div className="contenedorLink">
                    <Link to={`/publicacion/${_id}`}>
                        <div className="bgPublicacion" style={{backgroundImage: `url(${imagen})`}}></div>
                    </Link>
                </div>
                <div className="contenidoPublicacion">
                    <div>
                        <Link to={`/publicacion/${_id}`}><h2 className="titulosAlt">{titulo}</h2></Link>
                        <h3 className="titulosAlt">{subtitulo}</h3>
                        <p className="descripcion texto">{contenidoDescripcion}<Link to={`/publicacion/${_id}`}>... Ver mas!</Link></p>
                    </div>
                    <div className="valoracion">
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Rating name="read-only" value={publicacion.valoraciones.reduce((acc, valoracion, index)=>{
                            let num = valoracion.valoracion
                            return acc= acc + num 
                        }, 0) / publicacion.valoraciones.length} readOnly />
                        </Box>
                        <p className="texto">{publicacion.comentarios.length} comentarios</p>
                    </div>
                </div>
        </div>
        </>
    )
}

export default PublicacionIndividual