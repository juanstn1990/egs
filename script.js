// ===== Navegación Responsive =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menú móvil
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animación del botón hamburguesa
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');

        // Resetear botón hamburguesa
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===== Navegación activa en scroll =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');

    // Añadir clase scrolled a la navbar
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Actualizar enlace activo según la sección visible (solo para enlaces con ancla)
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    if (sections.length > 0) {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                link.classList.remove('active');
                if (href === `#${current}`) {
                    link.classList.add('active');
                }
            }
        });
    }
});

// ===== Smooth Scroll (solo para enlaces con ancla #) =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');

        // Solo aplicar smooth scroll si es un enlace interno con #
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== Formulario de Contacto =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const mensaje = document.getElementById('mensaje').value;

        // Crear mensaje para WhatsApp
        const whatsappNumber = '573133220467';
        const whatsappMessage = encodeURIComponent(
            `Hola, mi nombre es ${nombre}.\n\n` +
            `Email: ${email}\n` +
            `Teléfono: ${telefono}\n\n` +
            `Mensaje: ${mensaje}`
        );

        // Abrir WhatsApp
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');

        // Limpiar formulario
        contactForm.reset();

        // Mostrar mensaje de confirmación
        showNotification('Mensaje enviado', 'Te redirigimos a WhatsApp para completar el envío.');
    });
}

// ===== Función de notificación =====
function showNotification(title, message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        z-index: 10000;
        min-width: 300px;
        animation: slideInRight 0.5s ease;
    `;

    notification.innerHTML = `
        <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; font-weight: 600;">${title}</h4>
        <p style="margin: 0; font-size: 0.95rem; opacity: 0.9;">${message}</p>
    `;

    // Agregar animación CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 5000);
}

// ===== Animación de aparición de elementos al hacer scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar tarjetas de servicios y características
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.servicio-card, .feature-card, .contacto-item'
    );

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// ===== Scroll suave al hacer clic en los botones con anclas =====
const heroButtons = document.querySelectorAll('.hero-buttons a, .btn');

heroButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const href = button.getAttribute('href');

        // Solo aplicar smooth scroll si es un enlace interno con #
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);

            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== Efecto parallax sutil en el hero =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== Contador de años de experiencia (animación) =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Activar contador cuando sea visible
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const counterElement = entry.target.querySelector('h3');
            if (counterElement && counterElement.textContent.includes('14+')) {
                animateCounter(counterElement, 14);
                entry.target.classList.add('counted');
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        counterObserver.observe(card);
    });
});

// ===== Cerrar menú móvil al hacer clic fuera =====
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');

        // Resetear botón hamburguesa
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// ===== Validación de formulario en tiempo real =====
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '#22c55e';
        }
    });

    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            input.style.borderColor = '#3b82f6';
        }
    });
});

// ===== Preloader (opcional) =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Hero Slideshow =====
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slide');

    if (slides.length > 0) {
        let currentSlide = 0;

        function changeSlide() {
            // Remover clase active del slide actual
            slides[currentSlide].classList.remove('active');

            // Incrementar índice
            currentSlide = (currentSlide + 1) % slides.length;

            // Agregar clase active al nuevo slide
            slides[currentSlide].classList.add('active');
        }

        // Cambiar imagen cada 5 segundos (5000ms)
        setInterval(changeSlide, 5000);
    }
});

// ===== Slider de Testimoniales =====
let testimonioActual = 0;
let testimonioInterval;

function inicializarTestimoniales() {
    const testimonioCards = document.querySelectorAll('.testimonio-card');
    const dotsContainer = document.querySelector('.testimoniales-dots');

    if (testimonioCards.length > 0 && dotsContainer) {
        // Crear dots
        testimonioCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('testimoniales-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => irATestimonio(index));
            dotsContainer.appendChild(dot);
        });

        // Auto-play - iniciar inmediatamente
        iniciarAutoplay();

        console.log(`✓ Testimoniales inicializados: ${testimonioCards.length} testimonios con auto-play cada 4 segundos`);
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarTestimoniales);
} else {
    // DOM ya está listo
    inicializarTestimoniales();
}

function cambiarTestimonio(direccion) {
    const testimonioCards = document.querySelectorAll('.testimonio-card');
    const dots = document.querySelectorAll('.testimoniales-dot');

    // Agregar clase de salida al testimonio actual
    testimonioCards[testimonioActual].classList.add('exiting');

    // Remover clase active del testimonio actual después de un pequeño delay
    setTimeout(() => {
        testimonioCards[testimonioActual].classList.remove('active', 'exiting');
        dots[testimonioActual].classList.remove('active');
    }, 100);

    // Calcular nuevo índice
    testimonioActual += direccion;

    // Loop
    if (testimonioActual >= testimonioCards.length) {
        testimonioActual = 0;
    } else if (testimonioActual < 0) {
        testimonioActual = testimonioCards.length - 1;
    }

    // Agregar clase active al nuevo testimonio después de un pequeño delay
    setTimeout(() => {
        testimonioCards[testimonioActual].classList.add('active');
        dots[testimonioActual].classList.add('active');
    }, 150);

    // Reiniciar autoplay
    reiniciarAutoplay();
}

function irATestimonio(index) {
    const testimonioCards = document.querySelectorAll('.testimonio-card');
    const dots = document.querySelectorAll('.testimoniales-dot');

    // Agregar clase de salida al testimonio actual
    testimonioCards[testimonioActual].classList.add('exiting');

    // Remover clase active de todos
    setTimeout(() => {
        testimonioCards[testimonioActual].classList.remove('active', 'exiting');
        dots[testimonioActual].classList.remove('active');
    }, 100);

    // Establecer nuevo índice
    testimonioActual = index;

    // Agregar clase active al nuevo testimonio
    setTimeout(() => {
        testimonioCards[testimonioActual].classList.add('active');
        dots[testimonioActual].classList.add('active');
    }, 150);

    // Reiniciar autoplay
    reiniciarAutoplay();
}

function iniciarAutoplay() {
    testimonioInterval = setInterval(() => {
        cambiarTestimonio(1);
    }, 4000); // Cambia cada 4 segundos
}

function reiniciarAutoplay() {
    clearInterval(testimonioInterval);
    iniciarAutoplay();
}

// Pausar autoplay cuando el usuario interactúa
const testimonioSlider = document.querySelector('.testimoniales-slider');
if (testimonioSlider) {
    testimonioSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonioInterval);
    });

    testimonioSlider.addEventListener('mouseleave', () => {
        iniciarAutoplay();
    });
}

console.log('%c El Gran Shadday - Sitio Web Cargado ✓', 'color: #1e3a8a; font-size: 16px; font-weight: bold;');
console.log('%c Seguridad y confianza para proteger lo que más importa', 'color: #3b82f6; font-size: 12px;');
