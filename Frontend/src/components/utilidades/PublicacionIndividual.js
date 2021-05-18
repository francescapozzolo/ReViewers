import {Link} from 'react-router-dom'
import { Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from 'react-redux';
import { toast } from 'react-toastify';


const PublicacionIndividual = (props) => {
// eslint-disable-next-line
    const {_id , titulo , subtitulo , imagen , autor , descripcion, valoraciones} = props.publicacion
    const publicacion = props.publicacion
    let contenidoDescripcion = descripcion.slice(0,301)
    const toasts = (
        tipo,
        mensaje,
        position,
        autoClose,
        closeOnClick,
        pauseOnHover,
        draggable,
        toastId,
        closeButton
      ) => {
        toast[tipo](mensaje, {
          position,
          closeOnClick,
          pauseOnHover,
          draggable,
          toastId,
          closeButton,
          autoClose,
        });
      };

      const toastLoguear = ()=>{
          toasts('error','Por favor inicia sesión o registrate para ver más','top-center',3500,true,true,true,'iniciaSesionPrimero',false)
      }
    return(
        <>
        <Link to={`/publicacion/${_id}`}>
            <div className="tarjetaPublicaciones">
                <div className="contenedorLink">

                    { props.usuarioLogeado ? <Link to={`/publicacion/${_id}`}>
                        <div className="bgPublicacion" style={{backgroundImage: `url(${imagen})`}}></div>
                    </Link>
                    : <div className="bgPublicacion" style={{backgroundImage: `url(${imagen})`}} onClick={toastLoguear}></div>
                }
                </div>
                <div className="contenidoPublicacion">
                    <div>
                        {
                            props.usuarioLogeado ?
                            <Link to={`/publicacion/${_id}`}>
                                <h2 className="titulosAlt">{titulo}</h2>
                            </Link>
                            :<h2 className="titulosAlt" onClick={toastLoguear}>{titulo}</h2>
                        }
                        <h3 className="titulosAlt">{subtitulo}</h3>
                        <p className="descripcion texto">{contenidoDescripcion}
                        {
                            props.usuarioLogeado ?<Link to={`/publicacion/${_id}`}>
                                ... Ver mas!
                                </Link>
                                :<span style={!props.usuarioLogeado ?{color:'rgb(89, 89, 223)',cursor:'pointer'}: null} onClick={toastLoguear}>
                                ... Ver mas!
                                </span>
                        }
                                
                        </p>
                    </div>
                    <div className="valoracion">
                     <Tooltip arrow title={valoraciones.length === 0 ? 'Nadie valoro esta publicacion' : `${valoraciones.length} persona/s valoraron` } placement="top-start">
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Rating name="read-only" value={publicacion.valoraciones.reduce((acc, valoracion, index)=>{
                            let num = valoracion.valoracion
                            return acc= acc + num 
                        }, 0) / publicacion.valoraciones.length} readOnly />
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

const mapStateToProps = state =>{
    return {
        usuarioLogeado: state.authReducer.usuarioLogeado
    }
}

export default connect(mapStateToProps) (PublicacionIndividual)