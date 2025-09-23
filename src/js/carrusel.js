document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const slides = document.querySelectorAll('.carrusel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;

    // Función para mostrar un slide específico
    function showSlide(n) {
        // Quitar clase active de todos los slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Quitar clase active de todos los dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostrar el slide actual
        slides[n].classList.add('active');
        dots[n].classList.add('active');
        
        // Actualizar el índice del slide actual
        currentSlide = n;
    }

    // Función para avanzar al siguiente slide
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) {
            next = 0;
        }
        showSlide(next);
    }

    // Función para retroceder al slide anterior
    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) {
            prev = slides.length - 1;
        }
        showSlide(prev);
    }

    // Iniciar el intervalo para cambio automático
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 6000); // Cambio cada 6 segundos
    }

    // Reiniciar el intervalo cuando se hace clic en los botones
    function resetInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }

    // Event listeners para los botones
    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetInterval();
    });

    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetInterval();
    });

    // Event listeners para los dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            resetInterval();
        });
    });

    // Iniciar el carrusel
    startSlideInterval();
});