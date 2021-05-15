
import React from 'react';
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
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
class App extends React.Component {
  render(){
    if(!this.props.usuarioLogeado && localStorage.getItem('token')) {
      const usuarioLS = JSON.parse(localStorage.getItem('usuarioLogeado'))
      const ObjUsuarioLS = {
        token: localStorage.getItem('token'),
        ...usuarioLS
      }
      this.props.iniciarSesionLS(ObjUsuarioLS)
    }

    return(
      <BrowserRouter>
            <Header />
            <Switch>
                {!this.props.usuarioLogeado && <Route exact path="/" component={Portada} />}
                {this.props.usuarioLogeado && <Route path="/inicio" component={Inicio} />}
                {this.props.usuarioLogeado && <Route path="/publicar" component={CrearPublicacion} />}
                <Route path="/publicaciones/:categoria" component={Publicaciones}/>
                <Route path="/publicacion/:id" component={Resenia} />                
                <Route path="/prueba" component={PaginaDePrueba} />                
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
