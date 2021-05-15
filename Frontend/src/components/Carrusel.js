import {useEffect, useRef, useState} from 'react'

let aux = 0;

const Carrusel = () => {
    
    const cambiarSlide = (e) => {
        const numero = e.target.dataset.slide
        setVisible(parseInt(numero))
    }

    const [visible, setVisible] = useState(aux)
    
    useEffect(() => {
       const intervaloCarrusel = setInterval(() => {
            if(aux === 3) {
                aux = 0
            } else {
                aux += 1
            }
            setVisible(aux)
        }, 5000)
        return () => {
            clearInterval(intervaloCarrusel)
        }
    }, [])

    const cantidadDeSlides = ["GASTRONOMÍA","TECNOLOGIA","ENTRETENIMIENTO","DEPORTES"]
    const imagenesSlide0 = ['url("/assets/gastronomia/cervezas.jpg")','url("/assets/gastronomia/pescado.jpg")','url("/assets/gastronomia/macarons.jpg")','url("/assets/gastronomia/parrilla.jpeg")','url("/assets/gastronomia/helado.jpg")']
    const imagenesSlide1 = ['url("/assets/tecnologia/bitcoin.jpg")','url("/assets/tecnologia/smartwatch.jpg")','url("/assets/tecnologia/tecnologia.jpg")','url("/assets/tecnologia/tecnologia2.jpg")','url("/assets/tecnologia/smarthome.jpg")']
    const imagenesSlide2 = ['url("/assets/entretenimiento/netflix.jpeg")','url("/assets/entretenimiento/musica.jpg")','url("/assets/entretenimiento/leer.jpg")','url("/assets/entretenimiento/videojuegos.jpg")','url("/assets/entretenimiento/peli.jpg")']
    const imagenesSlide3 = ['url("/assets/deportes/formula1.jpg")','url("/assets/deportes/futbol.jpg")','url("/assets/deportes/running.jpg")','url("/assets/deportes/volley.jpg")','url("/assets/deportes/tenis.jpg")']

    return(

        <div id="contenedorCarrusel">
            <div className="contenedorTituloDots">
                <div>
                    <h1 className="texto titulosAlt">Mejores Reviews</h1>
                </div>

                <ul className="menuSlides">
                    <li>
                        <p className="dot-slider" data-slide="0" onClick={cambiarSlide}>.</p>
                    </li>
                    <li>
                        <p className="dot-slider" data-slide="1" onClick={cambiarSlide}>.</p>
                    </li>
                    <li>
                        <p className="dot-slider" data-slide="2" onClick={cambiarSlide}>.</p>
                    </li>
                    <li>
                        <p className="dot-slider" data-slide="3" onClick={cambiarSlide}>.</p>
                    </li>
                </ul>
            </div>

            <ul className="slider">
                {
                    cantidadDeSlides.map((slide, index) =>{
                        let imagenesSlide = index === 0 ? imagenesSlide0 : index === 1 ? imagenesSlide1 : index === 2 ? imagenesSlide2 : imagenesSlide3 
                        return (
                            <li key={index} className="slideGrid" style={visible === index ? {opacity: '1'} : {opacity: '0'}}>
                                <div style={{backgroundImage: imagenesSlide[0]}}></div>
                                <div>
                                    <h2 className="titulosFont tituloCarrusel">{slide}</h2>
                                </div>
                                <div style={{backgroundImage: imagenesSlide[1]}}></div>
                                <div style={{backgroundImage: imagenesSlide[2]}}></div>
                                <div></div>
                                <div style={{backgroundImage: imagenesSlide[3]}}></div>
                                <div style={{backgroundImage: imagenesSlide[4]}}></div>

                            </li>
                        )
                    })
                }
            </ul>
            
        </div>


    )
}

export default Carrusel