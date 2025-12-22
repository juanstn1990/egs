// ===== Variables globales =====
let currentLightboxIndex = 0;
const galeriaImages = [
    'media/images/galeria/image.png',
    'media/images/galeria/image copy.png',
    'media/images/galeria/image copy 2.png',
    'media/images/galeria/image copy 3.png',
    'media/images/galeria/image copy 4.png',
    'media/images/galeria/image copy 5.png',
    'media/images/galeria/image copy 6.png'
];

// ===== Filtros de galería =====
const filterButtons = document.querySelectorAll('.filter-btn');
const galeriaItems = document.querySelectorAll('.galeria-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover clase active de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Agregar clase active al botón clickeado
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galeriaItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                const category = item.getAttribute('data-category');
                if (category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// ===== Lightbox =====
function openLightbox(index) {
    currentLightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    lightboxImg.src = galeriaImages[index];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeLightboxImage(direction) {
    currentLightboxIndex += direction;

    // Loop around si llega al final o inicio
    if (currentLightboxIndex >= galeriaImages.length) {
        currentLightboxIndex = 0;
    } else if (currentLightboxIndex < 0) {
        currentLightboxIndex = galeriaImages.length - 1;
    }

    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.style.opacity = '0';

    setTimeout(() => {
        lightboxImg.src = galeriaImages[currentLightboxIndex];
        lightboxImg.style.opacity = '1';
    }, 200);
}

// Cerrar lightbox con tecla ESC
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// Navegar con flechas del teclado
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            changeLightboxImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeLightboxImage(1);
        }
    }
});

// Cerrar lightbox al hacer clic fuera de la imagen
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

console.log('%c Galería Cargada ✓', 'color: #1e3a8a; font-size: 14px; font-weight: bold;');
