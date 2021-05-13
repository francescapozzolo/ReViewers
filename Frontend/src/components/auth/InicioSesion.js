import { useState } from 'react';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import authActions from '../../redux/actions/authActions'

const InicioSesion = (props) =>{
    
    const [usuarioPagina, setUsuarioPagina] = useState({
        mail: '',
        clave: ''
    })

    const { mail, clave } = usuarioPagina

    const guardarInfoUsuario = (e) => {
        e.preventDefault();
        setUsuarioPagina({
            ...usuarioPagina,
            [e.target.name]: e.target.value
        })
    }

    const enviarInfoUsuario = async (e = null, usuarioGoogle = null) => {
        e && e.preventDefault();
        let usuario = usuarioGoogle ? usuarioGoogle : usuarioPagina
        
        if(!Object.values(usuario).some(value => value === '')) {
            const respuestaConErrores = await props.iniciarSesion(usuario)
            
            if(!respuestaConErrores) {
                let campos = ({
                    mail: '',
                    clave: ''
                })
            } else {
                console.log(respuestaConErrores)
            }
        } else {
            alert('No pueden haber campos vacios')
        }
    }

    const respuestaGoogle = (respuesta) => {
        if(respuesta.profileObj) {
            const { email, googleId } = respuesta.profileObj
            let usuarioGoogle = {
                mail: email,
                clave: googleId
            }
            enviarInfoUsuario(null, usuarioGoogle)
        }
    }

    const [modal, setModal] = useState(false)
        
    const selectModal = () => {
        setModal(!modal) 
    }

    const divStyle = { 
        display: modal ? 'block' : 'none'
    };

   function closeModal(e) {
      e.stopPropagation()
      selectModal()
   }

    return(
    <div className="App">
       <p className="link titulosAlt mx-1" onClick={ selectModal }>Iniciar Sesion</p>      
       <div className="modal" onClick={(e) =>  closeModal(e) } style={divStyle}>
            <div className="modal-content bg-verde-200" onClick={ e => e.stopPropagation() }>
                <span className="close" onClick={(e) =>  closeModal(e) }>&times;</span>
                <div className="containerForm">
                    <div className="form">
                        <div className="inputContainer">
                            <div className="text-center titulosAlt tituloForm">
                                <div className="">Reviewers</div>
                                <div className="tipoForm">Ingreso</div>
                            </div>
                            
                            <div>
                                <input onChange={guardarInfoUsuario} type="email" name="email" placeholder="Email"></input>
                            </div>
                            <div>
                                <input onChange={guardarInfoUsuario} id="password" type="password" name="clave" placeholder="Clave"></input>
                            </div>
                          
                        </div>
                        
                        <div className="flex flex-col">
                            <button onClick={enviarInfoUsuario} type="text" id="registroIngreso" name="registrarme">Ingresar</button>
                            <GoogleLogin
                                clientId="924799610861-e5kub6kcl4d4hhbtcoqicrhk4ou25vme.apps.googleusercontent.com"
                                buttonText="Ingresar con Google"
                                onSuccess={respuestaGoogle}
                                onFailure={respuestaGoogle}
                                cookiePolicy={'single_host_origin'}
                                className="botonGoogle"
                            />
                        </div>

                        <div className="text-center">
                            <Link>
                                <div className="LinkIngresoRegistro titulosTexto text-azul-900">No tienes una cuenta?, crear una!</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

const mapStateToProps = state => {
    return{
        usuarioLogeado: state.authReducer.usuarioLogeado
    }
}

const mapDispatchToProps = {
    iniciarSesion: authActions.iniciarSesion
}

export default connect(mapStateToProps, mapDispatchToProps)(InicioSesion)