
import React from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import { connect } from 'react-redux';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Portada from './pages/Portada';
import CrearPublicacion from './components/CrearPublicacion';
import Header from './components/Header';
import PaginaDePrueba from './pages/PaginaDePrueba';

class App extends React.Component {
  render(){
    return(
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={Portada} />
                <Route path="/inicio" component={Inicio} />
                <Route path="/publicar" component={CrearPublicacion} />
                <Route path="/prueba" component={PaginaDePrueba} />                
                <Redirect to="/" />
            </Switch>
            <Footer component={Footer}/>
        </BrowserRouter>
      )
  }
}

export default connect (null)(App)
// export default App
