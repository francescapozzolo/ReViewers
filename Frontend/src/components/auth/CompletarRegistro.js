import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import authActions from '../../redux/actions/authActions'
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';


const CompletarRegistro = (props) =>{

    const [categoriaInteres, setCategoriaInteres] = useState({
        gastronomia: false,
        deportes: false,
        tecnologia: false,
        entretenimiento: false
    })
    const toTop = ()=>{
        window.scrollTo(0,0)
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
   
   const categoriaSeleccionada = (e) => {
        setCategoriaInteres({
            ...categoriaInteres,
            [e.target.dataset.categoria]: !categoriaInteres[e.target.dataset.categoria],
        })
   }

   const [checked, setChecked] = useState(true);
   const [rol, setRol] = useState('escritor')

   const cambiarRolUsuario = (e) => {
     setChecked(!checked);
    checked ? setRol('lector') : setRol('escritor')
   };

   const confirmarUsuario = async () => {
        let arrayIntereses = [categoriaInteres.gastronomia && 'gastronomia', categoriaInteres.deportes && 'deportes', categoriaInteres.tecnologia && 'tecnologia', categoriaInteres.entretenimiento && 'entretenimiento']
        const intereses = arrayIntereses.filter(interes => interes !== false)

        let rolUsuarioIntereses = {
            usuarioConfirmado: true,
            intereses,
            rol,
            token: props.usuarioLogeado.token
        }

        const respuesta = await props.confirmarUsuario(rolUsuarioIntereses)
   }
   useEffect(() => {
       selectModal()
   }, [])
    return(
    <div className="App">
        {/* esto va a estar oculto, y en caso de que se valide que el usuario no tiene la propiedad usuarioConfirmado en true va a llamarse cuando se monta el componente */}
        {/* <p className="link titulosAlt mx-1" onClick={ selectModal }>Completar Registro</p>*/}
       <div className="modal" onClick={(e) =>  closeModal(e) } style={divStyle}>
            <div className="modal-content bg-verde-200" onClick={ e => e.stopPropagation() }>
                <span className="close" onClick={(e) =>  closeModal(e) }>&times;</span>

                <div className="containerForm">
                    <div className="form">
                        <div className="inputContainer flex flex-col align-center">
                            <div className="text-center titulosAlt tituloForm">
                                <div className="tipoForm">Ultimo paso, elige tus intereses!</div>
                            </div>

                            <div className="Flex flex-col contenedorIntereses  titulosAlt titulosIntereses">
                                <div className="flex">
                                    <div>
                                        <div>Gastronomia</div>
                                        <div onClick={categoriaSeleccionada} data-categoria="gastronomia" className={categoriaInteres.gastronomia ? 'box categoriaSeleccionada' : 'box'} style={{
                                            backgroundImage: "url('/assets/gastronomia/macarons.jpg')"
                                        }}></div>
                                    </div>
                                    <div>
                                        <div>Tecnologia</div>
                                        <div onClick={categoriaSeleccionada} data-categoria="tecnologia" className={categoriaInteres.tecnologia ? 'box categoriaSeleccionada' : 'box'} style={{
                                            backgroundImage: "url('/assets/tecnologia/tecnologia.jpg')"
                                        }}></div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div>
                                        <div>Entretenimiento</div>
                                        <div onClick={categoriaSeleccionada} data-categoria="entretenimiento" className={categoriaInteres.entretenimiento ? 'box categoriaSeleccionada' : 'box'} style={{
                                            backgroundImage: "url('/assets/entretenimiento/musica.jpg')"
                                        }}></div>
                                    </div>
                                    <div>
                                        <div>Deportes</div>
                                        <div onClick={categoriaSeleccionada} data-categoria="deportes" className={categoriaInteres.deportes ? 'box categoriaSeleccionada' : 'box'} style={{
                                            backgroundImage: "url('/assets/deportes/formulauno.jpg')"
                                        }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="texto textoIntereses footerIntereses flex flex-col justify-center">
                                <div className="flex items-center">
                                    Quiero crear contenido
                                    <Checkbox checked={checked} onChange={cambiarRolUsuario} inputProps={{ 'aria-label': 'primary checkbox' }}/>
                                </div>
                                <div className="w-full flex mx-auto">
                                    <Button onClick={confirmarUsuario} className="btnSubmitIntereses" variant="contained" color="secondary">Hecho!</Button>
                                </div>
                            </div>
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
    confirmarUsuario: authActions.confirmarUsuario
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletarRegistro)