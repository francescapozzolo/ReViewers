
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
import PaginaDePrueba from './pages/PaginaDePrueba';

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
                <Route exact path="/" component={Portada} />
                <Route path="/inicio" component={Inicio} />
                <Route path="/publicar" component={CrearPublicacion} />
                //<Route path="/prueba" component={PaginaDePrueba} />                
                <Redirect to="/" />
            </Switch>
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
// export default App
