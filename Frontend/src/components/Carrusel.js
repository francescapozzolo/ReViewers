import {useEffect, useRef, useState} from 'react'

let aux = 1;

const Carrusel = () => {
    const slide1 = useRef(null)
    const slide2 = useRef(null)
    const slide3 = useRef(null)
    const slide4 = useRef(null)
    
    const cambiarSlide = (e) => {
        const numero = e.target.dataset.slide
        setVisible(parseInt(numero))
    }

    const [visible, setVisible] = useState(aux)
    
    useEffect(() => {
      const intervaloCarrousel = setInterval(() => {
            if(aux === 4) {
                aux = 1
            } else {
                aux += 1
            }
            setVisible(aux)
        }, 5000)
        return () => {
            clearInterval(intervaloCarrousel)
        }
    }, [])

    return(

        <div id="contedorCarrusel">
                <ul className="menuSlides">
                    <li>
                        <p data-slide="1" onClick={cambiarSlide}>.</p>
                    </li>
                    <li>
                        <p data-slide="2" onClick={cambiarSlide}>.</p>
                    </li>
                    <li>
                        <p data-slide="3" onClick={cambiarSlide}>.</p>
                    </li>
                    <li>
                        <p data-slide="4" onClick={cambiarSlide}>.</p>
                    </li>
                </ul>
                
            <ul className="slider">
                <li ref={slide1} className="slideGrid" style={visible === 1 ? {opacity: '1'} : {opacity: '0'}}>
                    <div style={{backgroundImage: 'url("/assets/gastronomia/cervezas.jpg")'}}></div>
                    <div>
                        <h1 className="texto titulosAlt">Mejores Reviews</h1>
                    </div>
                    <div style={{backgroundImage: 'url("/assets/gastronomia/pescado.jpg")'}}></div>
                    <div style={{backgroundImage: 'url("/assets/gastronomia/macarons.jpg")'}}></div>
                    <div>
                        <h2 className="titulosFont">GASTRONOMIA</h2>
                    </div>
                    <div style={{backgroundImage: 'url("/assets/gastronomia/parrilla.jpeg")'}}></div>
                    <div style={{backgroundImage: 'url("/assets/gastronomia/helado.jpg")'}}></div>
                </li>
                <li ref={slide2} className="slideGrid" style={visible === 2 ? {opacity: '1'} : {opacity: '0'}}>
                    <div style={{backgroundImage: 'url("/assets/tecnologia/bitcoin.jpg")'}}></div>
                    <div>
                        <h1 className="texto titulosAlt">Mejores reviews</h1>
                    </div>
                    <div style={{backgroundImage: 'url("/assets/tecnologia/smartwatch.jpg")'}}></div>
                    <div style={{backgroundImage: 'url("/assets/tecnologia/tecnologia.jpg")'}}></div>
                    <div>
                        <h2 className="titulosFont">TECNOLOGIA</h2>
                    </div>
                    <div style={{backgroundImage: 'url("/assets/tecnologia/tecnologia2.jpg")'}}></div>
                    <div style={{backgroundImage: 'url("/assets/tecnologia/smarthome.jpg")'}}></div>
                </li>
                <li ref={slide3} className="slideGrid" style={visible === 3 ? {opacity: '1'} : {opacity: '0'}}>
                    <div style={{backgroundImage: 'url("/assets/entretenimiento/netflix.jpeg")'}}></div>
                    <div>
                        <h1 className="texto titulosAlt">Mejores reviews</h1>
                    </div>
                    <div style={{backgroundImage: 'url("/assets/entretenimiento/musica.jpg")'}}></div>
                    <div style={{backgroundImage: 'url("/assets/entretenimiento/leer.jpg")'}}></div>
                    <div>
                        <h2 className="titulosFont">ENTRETENIMIENTO</h2>
                    </div>
                    <div style={{backgroundImage: 'url("/assets/entretenimiento/videojuegos.jpg")'}}></div>
                    <div style={{backgroundImage: 'url("/assets/entretenimiento/peli.jpg")'}}></div>
                </li>
                <li ref={slide4} className="slideGrid" style={visible === 4 ? {opacity: '1'} : {opacity: '0'}}>
                    <div style={{backgroundImage: 'url("/assets/deportes/formula1.jpg")'}}></div>
                    <div>
                        <h1 className="texto titulosAlt">Mejores reviews</h1>
                    </div>
                    <div style={{backgroundImage: 'url("/assets/deportes/futbol.jpg")'}}></div>
                    <div style={{backgroundImage: 'url("/assets/deportes/running.jpg")'}}></div>
                    <div>
                        <h2 className="titulosFont">DEPORTES</h2>
                    </div>
                    <div style={{backgroundImage: 'url("/assets/deportes/volley.jpg")'}}></div>
                    <div style={{backgroundImage: 'url("/assets/deportes/tenis.jpg")'}}></div>
                </li>
            </ul>
            
        </div>


    )
}

export default Carrusel