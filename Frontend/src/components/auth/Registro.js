import { useState } from 'react';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import authActions from '../../redux/actions/authActions' 
// import FacebookLogin from 'react-facebook-login';

const Registro = (props) =>{

    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: '',
        apellido: '',
        mail: '',
        clave: '',
        imagen: ''
    })

    const [errores, setErrores] = useState({
        nombre: '',
        apellido: '',
        mail: '',
        clave: '',
        imagen: ''
    })
 
    const guardarInfoUsuario = (e) => {
        e.preventDefault();
        setNuevoUsuario({
            ...nuevoUsuario,
            [e.target.name]: e.target.value
        })
    }
    
    const enviarInfoUsuario = async (e = null, usuarioGoogle = null) => {
        e && e.preventDefault();
        let usuario = usuarioGoogle ? usuarioGoogle : nuevoUsuario
        console.log(usuario)
        if(!Object.values(usuario).some(value => value === '')) {
            const respuestaConErrores = await props.crearUsuario(usuario)
            
            let campos = ({
                nombre: '',
                apellido: '',
                mail: '',
                clave: '',
                imagen: ''
            })

            // si existe respuestaConErrores
            respuestaConErrores ? setErrores({campos}) : setNuevoUsuario({campos})

            console.log('respuesta con eerrores', respuestaConErrores)

            respuestaConErrores && respuestaConErrores.map(err => setErrores(prevState => {
                return {...prevState, [err.context.label]: err.message}
            }))
            
        } else {
            alert('No pueden haber campos vacios')
        }
    }

    const respuestaGoogle = (respuesta) => {
        console.log(respuesta.profileObj)

        const { email, familyName, givenName, googleId, imageUrl } = respuesta.profileObj

        let usuarioGoogle = {
            nombre: givenName,
            apellido: familyName,
            mail: email,
            clave: googleId,
            imagen: imageUrl
        }
        enviarInfoUsuario(null, usuarioGoogle)
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
       <p onClick={ selectModal }>Open Modal</p>      
       <div className="modal" onClick={(e) =>  closeModal(e) } style={divStyle}>
            <div className="modal-content bg-verde-200" onClick={ e => e.stopPropagation() }>
                <span className="close" onClick={(e) =>  closeModal(e) }>&times;</span>
                <div className="containerForm">
                    <div className="form">
                        <div className="inputContainer">
                            <div className="text-center titulosAlt tituloForm">
                                <div className="">Reviewers</div>
                                <div className="tipoForm">Registro</div>
                            </div>
                            <div className="flex justify-between">
                                <input onChange={guardarInfoUsuario} type="text" name="nombre" placeholder="Nombre"></input>
                                <input onChange={guardarInfoUsuario} type="text" name="apellido" placeholder="Apellido"></input>
                            </div>
                            <div className="alerta-errores flex">
                                <div className="w-50 mensajeAlerta">{errores.nombre && errores.nombre}</div>
                                <div className="w-50 mensajeAlerta">{errores.apellido && errores.apellido}</div>
                            </div>
                            <div>
                                <input onChange={guardarInfoUsuario} type="email" name="mail" placeholder="Email"></input>
                            </div>
                            <div className="alerta-errores">
                                <div className="w-50 mensajeAlerta">{errores.mail && errores.mail}</div>
                            </div>
                            <div className="flex justify-between">
                                <input onChange={guardarInfoUsuario} type="password" name="clave" placeholder="Clave"></input>
                                <input onChange={guardarInfoUsuario} type="text" name="imagen" placeholder="Imagen"></input>
                            </div>
                            <div className="alerta-errores flex">
                                <div className="w-50 mensajeAlerta">{errores.clave && errores.clave}</div>
                                {/* <div className="w-50 mensajeAlerta">{errores.imagen && errores.imagen}</div> */}
                            </div>
                        </div>
                        
                        <div className="flex flex-col">
                            <button type="text" id="registroIngreso" onClick={enviarInfoUsuario} name="registrarme">Crear cuenta</button>
                            <GoogleLogin
                                clientId="924799610861-e5kub6kcl4d4hhbtcoqicrhk4ou25vme.apps.googleusercontent.com"
                                buttonText="Crear cuenta con Google"
                                onSuccess={respuestaGoogle}
                                onFailure={respuestaGoogle}
                                cookiePolicy={'single_host_origin'}
                                className="botonGoogle"
                            />
                        </div>

                        <div className="text-center">
                            <Link>
                                <div className="LinkIngresoRegistro titulosTexto text-azul-900">Ya tienes una cuenta?, ingresar!</div>
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

    }
}

const mapDispatchToProps = {
    crearUsuario: authActions.crearUsuario
}

export default connect(mapStateToProps, mapDispatchToProps)(Registro)