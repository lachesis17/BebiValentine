function handleSlideAnimation(slide) {
    document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
    slide.classList.add('active');
}

let touchStartY = 0;
let touchEndY = 0;

function handleTouchStart(evt) {
    touchStartY = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
    touchEndY = evt.touches[0].clientY;
}

function handleTouchEnd() {
    if (!touchStartY || !touchEndY) {
        return;
    }
    const deltaY = touchStartY - touchEndY;
    const direction = deltaY > 0 ? 'down' : 'up';
    triggerSlideMove(direction);
    touchStartY = 0;
    touchEndY = 0;
}

function triggerSlideMove(direction) {
    const currentSlide = document.querySelector('.slide.active');
    let nextSlide = direction === 'down' ? currentSlide.nextElementSibling : currentSlide.previousElementSibling;

    if (nextSlide && nextSlide.classList.contains('slide')) {
        nextSlide.scrollIntoView({ behavior: 'smooth' });
        handleSlideAnimation(nextSlide);
    }
}

document.addEventListener('wheel', (event) => {
    //event.preventDefault();
    const deltaY = event.deltaY;
    const direction = deltaY > 0 ? 'down' : 'up';
    triggerSlideMove(direction);
});

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false);

document.addEventListener('scroll', () => {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        const rect = slide.getBoundingClientRect();
        if (rect.top <= (window.innerHeight / 2) && rect.bottom >= (window.innerHeight / 2)) {
            handleSlideAnimation(slide);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const firstSlide = document.querySelector('.slide');
    firstSlide.classList.add('active');
});
