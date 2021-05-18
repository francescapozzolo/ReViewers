
import React from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'

import { connect } from 'react-redux';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Portada from './pages/Portada';
import CrearPublicacion from './components/CrearPublicacion';
import Header from './components/Header';
import authActions from './redux/actions/authActions';
import Resenia from './pages/Resenia'
import Publicaciones from './pages/Publicaciones'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Favoritos from './pages/Favoritos'
import Configuraciones from './pages/Configuraciones';
import SideBar from './components/SideBar'


class App extends React.Component {


  render(){

    if(!this.props.usuarioLogeado && localStorage.getItem('token')) {
      const respuesta = this.props.iniciarSesionLS()
      if(!respuesta ){
        return <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>
      }
    }     
    return(
      <BrowserRouter id="outer-container">
        <SideBar/>
            <Header />    
            <ToastContainer
          newestOnTop={false}
          closeOnClick
          draggable
          pauseOnHover
          limit={4}
          hideProgressBar
        />       
        <div className="contenedor-pagina">
            <Switch >
                {!this.props.usuarioLogeado && <Route exact path="/" component={Portada} />}
                {this.props.usuarioLogeado && <Route path="/inicio" component={Inicio} />}
                <Route path="/publicaciones/:categoria" component={Publicaciones}/>
                {this.props.usuarioLogeado &&  <Route path="/favoritos" component={Favoritos} />}                
                {this.props.usuarioLogeado && <Route path="/publicacion/:id" component={Resenia} />}
                {this.props.usuarioLogeado && this.props.usuarioLogeado.rol === "escritor" && <Route path="/publicar" component={CrearPublicacion} />}
                {/* <Route path="/prueba" component={PaginaDePrueba} />                 */}
                {this.props.usuarioLogeado && <Route path="/configuraciones" component={Configuraciones} /> }               
                <Redirect to={this.props.usuarioLogeado ? "/inicio" : "/"} />
            </Switch>
        </div >
            <Footer component={Footer}/>
        

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
