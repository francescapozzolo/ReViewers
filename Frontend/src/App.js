
import React from 'react';
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import {BrowserRouter, Route, Redirect, Switch, Link} from 'react-router-dom'
import { connect } from 'react-redux';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Portada from './pages/Portada';
import CrearPublicacion from './components/CrearPublicacion';
import Header from './components/Header';
import authActions from './redux/actions/authActions';
import PaginaDePrueba from './pages/PaginaDePrueba';
import Resenia from './pages/Resenia'
import Publicaciones from './pages/Publicaciones'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { slide as Menu } from 'react-burger-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faHome, faFeatherAlt, faBookOpen, faUserCog, faStar } from '@fortawesome/free-solid-svg-icons'
import Favoritos from './pages/Favoritos'
import Configuraciones from './pages/Configuraciones';
import SideBar from './components/SideBar'





class App extends React.Component {


  render(){

    if(!this.props.usuarioLogeado && localStorage.getItem('token')) {
      const respuesta = this.props.iniciarSesionLS()
      if(!respuesta){
        //aca va loader
        return null
      }
    }     

    return(
      <BrowserRouter id="outer-container">
        <SideBar/>
        <div>
            <Header />    
            <Switch >
                {!this.props.usuarioLogeado && <Route exact path="/" component={Portada} />}
                {this.props.usuarioLogeado && <Route path="/inicio" component={Inicio} />}
                {this.props.usuarioLogeado &&<Route path="/publicaciones/:categoria" component={Publicaciones}/>}

                {this.props.usuarioLogeado && <Route path="/favoritos" component={Favoritos} />}
                {this.props.usuarioLogeado && <Route path="/publicacion/:id" component={Resenia} />}
                {this.props.usuarioLogeado && this.props.usuarioLogeado.rol === "escritor" && <Route path="/publicar" component={CrearPublicacion} />}
                {/* <Route path="/prueba" component={PaginaDePrueba} />                 */}
                {this.props.usuarioLogeado && <Route path="/configuraciones" component={Configuraciones} /> }               
                <Redirect to={this.props.usuarioLogeado ? "/inicio" : "/"} />
            </Switch>
            <Footer component={Footer}/>
        <ToastContainer
          newestOnTop={false}
          closeOnClick
          draggable
          pauseOnHover
          limit={4}
          hideProgressBar
        />       
        </div >

      </BrowserRouter>
      )
  }
}

const mapStateToProps = state => {
  return {
    usuarioLogeado: state.authReducer.usuarioLogeado
  }
}

const mapDispatchToProps = {
  iniciarSesionLS: authActions.iniciarSesionLS
}

export default connect (mapStateToProps, mapDispatchToProps)(App)
// export default App
