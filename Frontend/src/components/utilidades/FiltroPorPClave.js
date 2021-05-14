import { useEffect, useState } from "react"


const FiltroPorPClave = ({todasLasPublics})=>{
   
   const [publicaciones, setPublicaciones] = useState(todasLasPublics)

   // useEffect(()=>{
   //    setPublicaciones(todasLasPublics)
   // })
   // console.log(publicaciones)
   // publicaciones.map(publicacion => console.log('hola'))
   

   return (
      <>
         {/* <input type="text" placeholder="Busca por Palabra Clave" />

         {publicaciones.map( (publicacion) => {
            return(
               <div className="reseñaDePrueba-borrar">
                  <h1> {publicacion.titulo} </h1>
                  <div> {publicacion.tags.map(tag => <p>{tag}</p> ) } </div>
               </div>
            )
         })}  */}
      </>
   )
}

export default FiltroPorPClave