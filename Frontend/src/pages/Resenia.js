import { useEffect, useState } from "react"
import {connect} from "react-redux"
import Valoracion from "../components/utilidades/Valoracion"
import Rating from '@material-ui/lab/Rating';

const Resenia = (props)=>{
   const [reseniaSeleccionada, setReseniaSeleccionada] = useState({})

   useEffect(async()=>{
      const idResenia = props.match.params.id
      
      console.log(idResenia)
      console.log(props.todasLasPublicaciones)

      setReseniaSeleccionada( props.todasLasPublicaciones.find(publicacion => JSON.stringify(publicacion._id) === JSON.stringify(idResenia)))

      // if(props.todasLasPublicaciones.length < 0){
         // } else {
            //    const respuesta = await props.callSingleCity(idResenia)
            //    setReseniaSeleccionada(respuesta)
            // }
            // console.log(reseniaSeleccionada)
   }, [])
         
   console.log(reseniaSeleccionada)



   return(
      <>
         <div className="contenedor-tituloDeResenia">
            <div className="imagen-de-categoria"></div>
            <h3 className="titulo-de-resenia titulosAlt">{reseniaSeleccionada.titulo}</h3>
         </div>

         {/* <div className="contenedor-de-subtitulo">
            <h4 className="titulosAlt subtitulo-resenia">{reseniaSeleccionada.subtitulo}</h4>
         </div> */}

         <section className="resenia-section-container">
            <div className="reseniaSection-topContainer">
               <div className="contenedor-de-foto-de-resenia" style={{background: `url(${reseniaSeleccionada.imagen})`}} ></div>

               <div className="reseniaSection-right">
                  <div className="valorar-container">
                     <p className="titulosAlt">Valorar</p>
                     <Rating name={"rating"} style={{fontSize:"40px"}} />  {/*Agregarle esto onChange={(e, value) => cargarValoracion(idPublicacion, {idUsuario, valoracion: value})} */}
                  </div>

                     <h4 className="titulosAlt subtitulo-resenia">{reseniaSeleccionada.subtitulo}</h4>
                  <div className="reseniaText-container">
                     <p className="descripcion-resenia texto">{reseniaSeleccionada.descripcion}</p>
                  </div>

               </div>
            </div>


            <div className="resenia-comments-container">
               <div className="contenedor-comentarios"> </div>
               <input type="text" className="input-comentar" />
            </div>
         </section>


      </>
      )
}









const mapStateToProps = (state)=>{
   return {
      todasLasPublicaciones: state.publicacionReducer.todasLasPublicaciones
   }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Resenia)