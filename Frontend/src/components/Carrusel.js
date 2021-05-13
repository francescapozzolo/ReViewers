const Carrusel = () => {
    
    
    return(
        <div id="contedorCarrusel">
            <ul className="menuSlides">
                <li>
                    <a href="#slide1">.</a>
                </li>
                <li>
                    <a href="#slide2">.</a>
                </li>
                <li>
                    <a href="#slide3">.</a>
                </li>
                <li>
                    <a href="#slide4">.</a>
                </li>
            </ul>
            <ul className="slider">
                <li id="slide1" className="slideGrid">
                    <div style={{backgroundImage: 'url("/assets/gastronomia/cervezas.jpg")'}}></div>
                    <div>
                        <h1 className="texto titulosAlt">Mejores reviews</h1>
                    </div>
                    <div style={{backgroundImage: 'url("/assets/gastronomia/pescado.jpg")'}}></div>
                    <div style={{backgroundImage: 'url("/assets/gastronomia/macarrons.jpg")'}}></div>
                    <div>
                        <h2 className="titulosFont">GASTRONOMIA</h2>
                    </div>
                    <div style={{backgroundImage: 'url("/assets/gastronomia/parrilla.jpeg")'}}></div>
                    <div style={{backgroundImage: 'url("/assets/gastronomia/helado.jpg")'}}></div>
                </li>
                <li id="slide2" className="slideGrid">
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
                <li id="slide3" className="slideGrid">
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
                <li id="slide4" className="slideGrid">
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