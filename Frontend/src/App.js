
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





class App extends React.Component {


  state ={
    menuOpen: false
  }
  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }
  
  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu () {
    this.setState({menuOpen: false})
  }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu () {
    this.setState(state => ({menuOpen: !state.menuOpen}))
  }
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
      <BrowserRouter id="outer-container">
        <Menu styles={{backgroundImage: 'url("/assets/caratulas/patronSideBar.png")'}}  itemListElement = "div" pageWrapId={ "page-wrap" } isOpen={this.state.menuOpen}  onStateChange={(state) => this.handleStateChange(state)} outerContainerId={ "outer-container" } width={300} >
            <div className="SideHeader">
              <div>
                    <Link to="/" onClick={() => this.closeMenu()}>
                        <img alt="logo" className="logo2" src='/assets/logo2.png'></img>
                    </Link>
                </div>
                </div>            
            <div className="SideMain">
              
              <Link to="/" onClick={() => this.closeMenu()}>
                <FontAwesomeIcon className="sideBar-icon"icon={faHome} />
                Inicio</Link>
              <Link to="/publicaciones/all" onClick={() => this.closeMenu()}>
              <FontAwesomeIcon className="sideBar-icon"icon={faBookOpen} />
                Reseñas</Link>
              <Link to="/perfil" onClick={() => this.closeMenu()}>
              <FontAwesomeIcon className="sideBar-icon"icon={faUserCog}/>
                Configuraciones</Link>
              <Link to="/favoritos" onClick={() => this.closeMenu()}>
              <FontAwesomeIcon className="sideBar-icon"icon={faStar} />
                Favoritos</Link>
            </div>            
            <div className="SideFooter">Soy SideFooter</div>            
        </Menu>
        <div id="page-wrap">

            <Header />    
            <Switch >
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
