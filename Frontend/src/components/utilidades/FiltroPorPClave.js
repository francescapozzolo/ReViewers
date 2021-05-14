import { useState } from "react"


const FiltroPorPClave = ({todasLasPublics})=>{
   
   const [publicaciones, setPublicaciones] = useState(todasLasPublics)
   console.log(publicaciones)
   // publicaciones.map(publicacion => console.log('hola'))
   

   return (
      <input type="text" placeholder="Busca por Palabra Clave" />

      // {publicaciones.map(publicacion => {
      //    console.log('hola')}
      // } 
   )
}

export default FiltroPorPClave