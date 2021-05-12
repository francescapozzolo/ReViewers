const Carrusel = () => {
    return(
        <div id="contedorCarrusel">
            <h1 className="texto titulosAlt">Mejores reviews</h1>
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
                <li id="slide1">
                    <div>
                        <h2>Entretenimiento</h2>
                    </div>
                </li>
                <li id="slide2">
                    <div>
                        <h2>Deportes</h2>
                    </div>
                </li>
                <li id="slide3">
                    <div>
                        <h2>Gastronomía</h2>
                    </div>
                </li>
                <li id="slide4">
                    <div>
                        <h2>Tecnología</h2>
                    </div>
                </li>
            </ul>
            
        </div>
    )
}

export default Carrusel