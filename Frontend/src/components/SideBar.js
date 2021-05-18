import React from "react";
import { slide as Menu } from "react-burger-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InicioSesion from "./auth/InicioSesion";
import Registro from "./auth/Registro";
import {
  faHome,
  faFeatherAlt,
  faBookOpen,
  faUserCog,
  faStar,
  faSortDown,
  faGamepad,
  faFootballBall,
  faUtensils,
  faMobileAlt,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import sideBarActions from "../redux/actions/sideBarActions";
import authActions from "../redux/actions/authActions";
import MediaQuery from "react-responsive";

class SideBar extends React.Component {
  
  cerrarSesion = () => {
    this.props.changeState();
    this.props.cerrarSesion();
  };
  state ={
    reseniasToggle: false
  }

  reseniasToggle = ()=>{
    this.setState({reseniasToggle:!this.state.reseniasToggle})
  }
  render() {
    return (
      <Menu
        disableAutoFocus
        styles={{
          backgroundImage: 'url("/assets/caratulas/patronSideBar.png")',
        }}
        onClose={this.props.changeState}
        onOpen={this.props.changeState}
        itemListElement="div"
        pageWrapId={"page-wrap"}
        isOpen={this.props.menuOpen}
        outerContainerId={"outer-container"}
        width={300}
      >
        <div className="SideHeader">
          <div>
            <Link to="/" onClick={this.props.changeState}>
              <img alt="logo" className="logo2" src="/assets/logo2.png"></img>
            </Link>
          </div>
        </div>
        <div className="SideMain">
          <Link to="/" onClick={this.props.changeState} style={{marginTop:'20px'}}>
            <FontAwesomeIcon className="sideBar-icon" icon={faHome} />
            Inicio
          </Link>
          <div className="flex" style={{justifyContent:'space-between'}}>
            <div className="flex" style={{alignItems:'center'}}>
            <FontAwesomeIcon className="sideBar-icon" style={{cursor:'pointer'}} onClick={this.reseniasToggle} icon={faBookOpen} />
            <Link to="/publicaciones/all" style={{color:'white'}} onClick={this.props.changeState}>Reseñas </Link>
            </div>
            { this.props.usuarioLogeado && <FontAwesomeIcon icon={faSortDown} onClick={this.reseniasToggle} style={this.state.reseniasToggle?{transform:'rotate(180deg)',cursor:'pointer',  transition:'200ms'}:{transform:'rotate(0deg)',cursor:'pointer',  transition:'200ms'}}/>}
          </div>
          
          { this.props.usuarioLogeado && this.state.reseniasToggle ?
          <div className="resenia-toggle">  
          <Link to="/publicaciones/entretenimiento" onClick={this.props.changeState}>
            <FontAwesomeIcon className="sideBar-icon-toggle" icon={faGamepad} />
            Entretenimiento
          </Link>
          <Link to="/publicaciones/tecnologia" onClick={this.props.changeState}>
            <FontAwesomeIcon className="sideBar-icon-toggle" icon={faMobileAlt} />
            Tecnologia
          </Link>
          <Link to="/publicaciones/gastronomia" onClick={this.props.changeState}>
            <FontAwesomeIcon className="sideBar-icon-toggle" icon={faUtensils} />
            Gastronomia
          </Link>
          <Link to="/publicaciones/deportes" onClick={this.props.changeState}>
            <FontAwesomeIcon className="sideBar-icon-toggle" icon={faFootballBall} />
            Deportes
          </Link>
          
          
          </div> :null
          }


          {this.props.usuarioLogeado ? (
            <>
              <Link to="/favoritos" onClick={this.props.changeState}>
                <FontAwesomeIcon className="sideBar-icon" icon={faBookmark} style={{color:'#bd2121'}}/>
                Favoritos
              </Link>
              {this.props.usuarioLogeado.rol === "escritor" && (
                <Link
                  to="/publicar"
                  className="link texto"
                  onClick={this.props.changeState}
                >
                  <span className="btn-crearReview texto">
                    <FontAwesomeIcon
                      style={{ color: "blueviolet", marginRight: "5px" }}
                      icon={faFeatherAlt}
                    />
                    Crear review
                  </span>
                </Link>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="SideFooter">
          {this.props.usuarioLogeado ? (
            <>
              <Link to="/configuraciones" onClick={this.props.changeState}>
                <FontAwesomeIcon className="sideBar-icon" icon={faUserCog} />
                Configuraciones
              </Link>
              <span
                onClick={this.cerrarSesion}
                style={{ cursor: "pointer", textAlign:'left' }}
                className="mx-1 btn-crearReview texto"

              >
                Cerrar sesion
              </span>
            </>
          ) : (
            <MediaQuery maxDeviceWidth={530} >
              <div className="inicioRegistroSide">
                <InicioSesion />
                <Registro />
              </div>
            </MediaQuery>
          )}
        </div>
      </Menu>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    menuOpen: state.sideBarReducer.menuOpen,
    usuarioLogeado: state.authReducer.usuarioLogeado,
  };
};

const mapDispatchToProps = {
  changeState: sideBarActions.changeState,
  cerrarSesion: authActions.cerrarSesion,
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
