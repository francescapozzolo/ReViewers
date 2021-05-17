import {Link} from 'react-router-dom'
import { Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Tooltip from "@material-ui/core/Tooltip";



const PublicacionIndividual = ({publicacion}) => {
// eslint-disable-next-line
    const {_id , titulo , subtitulo , imagen , autor , descripcion, valoraciones} = publicacion
    let contenidoDescripcion = descripcion.slice(0,301)

    return(
        <>
        <Link to={`/publicacion/${_id}`}>
            <div className="tarjetaPublicaciones">
                <div className="contenedorLink">
                        <div className="bgPublicacion" style={{backgroundImage: `url(${imagen})`}}></div>
                    
                </div>
                <div className="contenidoPublicacion">
                    <div>
                        <h2 className="titulosAlt">{titulo}</h2>
                        <h3 className="titulosAlt">{subtitulo}</h3>
                        <p className="descripcion texto">{contenidoDescripcion}<Link to={`/publicacion/${_id}`}>... Ver mas!</Link></p>
                    </div>
                    <div className="valoracion">
                        <Tooltip arrow title={valoraciones.length === 0 ? 'Nadie valoro esta publicacion' : `${valoraciones.length} persona/s valoraron` } placement="top-start">
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Rating name="read-only" value={1} readOnly />
                            </Box>
                        </Tooltip>
                        <p className="texto">{publicacion.comentarios.length} comentarios</p>
                    </div>
                </div>
            </div>
        </Link>
        </>
    )
}

export default PublicacionIndividual