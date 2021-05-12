import { useState } from 'react';
import GoogleLogin from 'react-google-login';

const InicioSesion = () =>{
    
    const [modal, setModal] = useState(false)
        
    const selectModal = () => {
        setModal(!modal) // true/false toggle
    }

    const divStyle = { 
        display: modal ? 'block' : 'none'
    };

   function closeModal(e) {
      e.stopPropagation()
      selectModal()
   }

   const respuestaGoogle = () => {
        console.log('ingrese')
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
                                <div className="tipoForm">Ingreso</div>
                            </div>
                            
                            <div>
                                <input type="email" name="email" placeholder="Email"></input>
                            </div>
                            <div>
                                <input id="password" type="password" name="clave" placeholder="Clave"></input>
                            </div>
                          
                        </div>
                        
                        <div className="flex flex-col">
                            <button type="text" id="registroIngreso" name="registrarme">Ingresar</button>
                            {/* <button type="text" name="registrarmeGoogle">Crear cuenta con Google</button> */}
                            {/* <div id="botonGoogleContainer"> */}
                                <GoogleLogin
                                    clientId="924799610861-e5kub6kcl4d4hhbtcoqicrhk4ou25vme.apps.googleusercontent.com"
                                    buttonText="Ingresar con Google"
                                    onSuccess={respuestaGoogle}
                                    onFailure={respuestaGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    className="botonGoogle"
                                />
                            {/* </div> */}
                        </div>

                        <div className="text-center">
                            <div className="LinkIngresoRegistro titulosTexto">No tienes una cuenta?, crear una!</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default InicioSesion