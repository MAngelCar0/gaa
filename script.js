document.addEventListener('DOMContentLoaded', function() {
    // Configuración del carrusel
    const carruselConfig = {
        intervalo: 3000, // Tiempo en milisegundos entre cada cambio de imagen (3 segundos)
        fadeSpeed: 600   // Velocidad de la transición en milisegundos
    };

    // Obtener elementos del carrusel
    const imagenes = document.querySelectorAll('.carrusel-img');
    const flechaIzq = document.querySelector('.carrusel-flecha-izq');
    const flechaDer = document.querySelector('.carrusel-flecha-der');
    const indicadores = document.querySelectorAll('.indicador');
    let indiceActual = 0;
    
    // Función para mostrar una imagen específica
    function mostrarImagen(indice) {
        // Ocultar todas las imágenes y desactivar todos los indicadores
        imagenes.forEach(img => img.classList.remove('active'));
        indicadores.forEach(ind => ind.classList.remove('active'));
        
        // Mostrar la imagen seleccionada y activar su indicador
        imagenes[indice].classList.add('active');
        indicadores[indice].classList.add('active');
        
        // Actualizar el índice actual
        indiceActual = indice;
    }
    
    // Función para mostrar la siguiente imagen
    function mostrarSiguienteImagen() {
        const nuevoIndice = (indiceActual + 1) % imagenes.length;
        mostrarImagen(nuevoIndice);
    }
    
    // Función para mostrar la imagen anterior
    function mostrarImagenAnterior() {
        const nuevoIndice = (indiceActual - 1 + imagenes.length) % imagenes.length;
        mostrarImagen(nuevoIndice);
    }
    
    // Iniciar el carrusel automático
    let intervaloCarrusel = setInterval(mostrarSiguienteImagen, carruselConfig.intervalo);
    
    // Función para reiniciar el intervalo
    function reiniciarIntervalo() {
        clearInterval(intervaloCarrusel);
        intervaloCarrusel = setInterval(mostrarSiguienteImagen, carruselConfig.intervalo);
    }
    
    // Eventos para las flechas de navegación
    if (flechaIzq && flechaDer) {
        flechaIzq.addEventListener('click', function() {
            mostrarImagenAnterior();
            reiniciarIntervalo();
        });
        
        flechaDer.addEventListener('click', function() {
            mostrarSiguienteImagen();
            reiniciarIntervalo();
        });
    }
    
    // Eventos para los indicadores
    indicadores.forEach((indicador, indice) => {
        indicador.addEventListener('click', function() {
            mostrarImagen(indice);
            reiniciarIntervalo();
        });
    });
    
    // Detener el carrusel cuando el usuario pasa el mouse por encima
    const contenedorCarrusel = document.querySelector('.carrusel-container');
    if (contenedorCarrusel) {
        contenedorCarrusel.addEventListener('mouseenter', function() {
            clearInterval(intervaloCarrusel);
        });
        
        contenedorCarrusel.addEventListener('mouseleave', function() {
            reiniciarIntervalo();
        });
    }
});