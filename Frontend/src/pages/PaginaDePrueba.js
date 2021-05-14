import MeGusta from '../components/utilidades/MeGusta'
import Valoracion from '../components/utilidades/Valoracion'
import FiltroPorPClave from '../components/utilidades/FiltroPorPClave'
import {connect} from 'react-redux'
import publicacionesActions from '../redux/actions/publicacionesActions'
import { useEffect } from 'react'

const PaginaDePrueba = ({filtroPorPalabraClave, cargarPublicaciones, todasLasPublicaciones, publicacionesFiltradas})=> {

   useEffect(()=>{
      cargarPublicaciones()
   },[])

   console.log(todasLasPublicaciones)
   console.log(publicacionesFiltradas)
   return (
      <>
         <Valoracion idPublicacion={"609d4be85ea53f26e899e7ce"} idUsuario={"609c5cc478d84916706c147c"} />
         <MeGusta idPublicacion={"609d4be85ea53f26e899e7ce"} idUsuario={"609c5cc478d84916706c147c"}/>  
         
         
         <div className="centradorDePrueba-borrar">

            <input type="text" onChange={(e)=> filtroPorPalabraClave(e.target.value)} placeholder="Busca por Palabra Clave" />

            { publicacionesFiltradas.length > 0 ?
            publicacionesFiltradas.map( (publicacion) => {
               return(
                  <div key={publicacion.id} className="reseñaDePrueba-borrar"> {/* Mas adelante la key seria el _id */}
                     <h1> {publicacion.titulo} </h1>
                     <p>Palabras Clave:</p>
                     <div> {publicacion.tags.map(tag => <p>{tag}</p> ) } </div>
                  </div>
               )
            })
            : <h1>Actualmente no hay reseñas que hablen de eso, pero sé el primero en escribir una!</h1> }             
         </div>
      </>
   )
}

const mapStateToProps = (state)=>{
   return {
      todasLasPublicaciones: state.publicaciones.todasLasPublicaciones,
      publicacionesFiltradas: state.publicaciones.publicacionesFiltradas
   }
}

const mapDispatchToProps = {
   filtroPorPalabraClave: publicacionesActions.filtroPorPalabraClave,
   cargarPublicaciones: publicacionesActions.cargarPublicaciones
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginaDePrueba)