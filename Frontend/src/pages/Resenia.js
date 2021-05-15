import { useEffect, useState } from "react"
import {connect} from "react-redux"
import Valoracion from "../components/utilidades/Valoracion"
import Rating from '@material-ui/lab/Rating';

const Resenia = (props)=>{

   const [reseniaSeleccionada, setReseniaSeleccionada] = useState({})

   useEffect(()=>{
      const idResenia = props.match.params.id
      
      //console.log(idResenia)
      //console.log(props.todasLasPublicaciones)

      const findPublicacion = props.todasLasPublicaciones.filter(publicacion => JSON.stringify(publicacion._id) === JSON.stringify(idResenia))
      setReseniaSeleccionada(findPublicacion)
      

      // //console.log(reseniaSeleccionada)
      
      // //console.log(typeof(idResenia))
      // //console.log(typeof props.todasLasPublicaciones[0]._id)

      // if(props.todasLasPublicaciones.length < 0){
         // } else {
            //    const respuesta = await props.callSingleCity(idResenia)
            //    setReseniaSeleccionada(respuesta)
            // }
            // //console.log(reseniaSeleccionada)
   }, [])
         
   //console.log(reseniaSeleccionada)



   return(
      <>
         <div className="contenedor-tituloDeResenia">
            <div className="imagen-de-categoria"></div>
            <h3 className="titulo-de-resenia titulosAlt">Alquileres de Robots para Eventos</h3>
         </div>

         <div className="contenedor-de-subtitulo">
            <h4 className="titulosAlt subtitulo-resenia">Subtitulo</h4>
         </div>

         <section className="resenia-section-container">
            <div className="reseniaSection-topContainer">
               <div className="contenedor-de-foto-de-resenia"></div>

               <div className="reseniaSection-right">
                  <div className="valorar-container">
                     <p className="titulosAlt">Valorar</p>
                     <Rating name={"rating"} style={{fontSize:"40px"}} />  {/*Agregarle esto onChange={(e, value) => cargarValoracion(idPublicacion, {idUsuario, valoracion: value})} */}
                  </div>

                  <div className="reseniaText-container">
                     <p className="descripcion-resenia texto">Alguna vez probé un agua fresca riquísima de Yaca. Sí, esa fruta exótica que se da en la región de Bahía de Banderas y que tiene una cáscara con una textura rarísima pero que en su interior todo lo que tiene es sumamente nutritivo. Bien pues ahora comí un taco de yaca; es decir este fruto también se puede cocinar como alimento. Con un sabor especial y adobado prácticamente hubiera jurado que me estaba comiendo un taco al pastor, solo que era vegano. Ese fue el primer puesto que me cautivó. Pero en el recorrido había empanadas argentinas de vegetales, humus, mermeladas de dátiles y diversos frutos, pan integral de centeno, chocolate artesanal, productos de higiene personal naturales hechos a base de miel y otros productos, comida azteca con "</p>
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