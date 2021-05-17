import React from "react";
import { slide as Menu } from "react-burger-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFeatherAlt,
  faBookOpen,
  faUserCog,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import sideBarActions from "../redux/actions/sideBarActions";
import authActions from "../redux/actions/authActions";
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// const matches = useMediaQuery('(min-width:600px)');
// return <span>{`(min-width:600px) matches: ${matches}`}</span>;

class SideBar extends React.Component {
  // closeMenu () {
  //   this.setState({menuOpen: false})
  // }

  // toggleMenu () {
  //   this.setState(state => ({menuOpen: !state.menuOpen}))
  // }
  cerrarSesion = ()=>{

    this.props.changeState()
    this.props.cerrarSesion()
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
          <Link to="/" onClick={this.props.changeState} >
            <FontAwesomeIcon className="sideBar-icon" icon={faHome} />
            Inicio
          </Link>
              <Link to="/publicaciones/all" onClick={this.props.changeState}>
                <FontAwesomeIcon className="sideBar-icon" icon={faBookOpen} />
                Reseñas
              </Link>
          {this.props.usuarioLogeado ? (
            <>
              <Link to="/favoritos" onClick={this.props.changeState}>
                <FontAwesomeIcon className="sideBar-icon" icon={faStar} />
                Favoritos
              </Link>
            </>
          ) : (
            <>
            
            </>
          )}
        </div>
        <div className="SideFooter">
        {this.props.usuarioLogeado ? (
          <>
          <Link to="/configuraciones" onClick={this.props.changeState}>
            <FontAwesomeIcon className="sideBar-icon" icon={faUserCog} />
            Configuraciones
          </Link>
          <span onClick={ this.cerrarSesion } style={{cursor:'pointer'}} className="mx-1 btn-crearReview texto">Cerrar sesion</span>                  
          </>
        ):<>
        
        </>
        
        }
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
  cerrarSesion: authActions.cerrarSesion
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
