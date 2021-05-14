import MeGusta from '../components/utilidades/MeGusta'
import Valoracion from '../components/utilidades/Valoracion'
import FiltroPorPClave from '../components/utilidades/FiltroPorPClave'

const PaginaDePrueba = ()=> {

   const hola = [
      {titulo: "Reseña #1", tags: ['deporte', 'ropa', 'pasto']},
      {titulo: "Reseña #2", tags: ['tecnologia', 'computadora', 'gaming']},
      {titulo: "Reseña #3", tags: ['love', 'instagood', 'photooftheday']},
      {titulo: "Reseña #4", tags: ['fashion', 'beautiful', 'happy']},
      {titulo: "Reseña #5", tags: ['cute', 'tbt', 'like4like']},
      {titulo: "Reseña #6", tags: ['followme', 'picoftheday', 'summer']},
      {titulo: "Reseña #7", tags: ['me', 'selfie', 'gaming']},
      {titulo: "Reseña #8", tags: ['art', 'instadaily', 'friends']},
      {titulo: "Reseña #9", tags: ['repost', 'nature', 'girl']},
      {titulo: "Reseña #10", tags: ['fun', 'style', 'smile', 'food']},
   ]

   return (
      <>
         <Valoracion idPublicacion={"609d4be85ea53f26e899e7ce"} idUsuario={"609c5cc478d84916706c147c"} />
         <MeGusta idPublicacion={"609d4be85ea53f26e899e7ce"} idUsuario={"609c5cc478d84916706c147c"}/>  
         <div className="borrar">
            <FiltroPorPClave todasLasPublics={hola} />
         </div>
      </>
   )
}


export default PaginaDePrueba