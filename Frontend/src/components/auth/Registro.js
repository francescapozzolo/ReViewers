import { useState } from 'react';
import GoogleLogin from 'react-google-login';

const Registro = () =>{

    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: '',
        apellido: '',
        email: '',
        clave: '',
        foto: ''
    })

    const guardarInfoUsuario = (e) => {
        e.preventDefault();
        setNuevoUsuario({
            ...nuevoUsuario,
            [e.target.name]: e.target.value
        })
    }
    
    console.log(nuevoUsuario)

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
   
   const respuestaGoogle = () => {
        console.log('ingrese a login')
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
                            <div>
                                <input onChange={guardarInfoUsuario} type="email" name="email" placeholder="Email"></input>
                            </div>
                            <div className="flex justify-between">
                                <input onChange={guardarInfoUsuario} type="password" name="clave" placeholder="Clave"></input>
                                <input onChange={guardarInfoUsuario} type="text" name="foto" placeholder="Foto"></input>
                            </div>
                        </div>
                        
                        <div className="flex flex-col">
                            <button type="text" id="registroIngreso" name="registrarme">Crear cuenta</button>
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
                            <div className="LinkIngresoRegistro titulosTexto">Ya tienes una cuenta?, ingresar!</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}


export default Registro