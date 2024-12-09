const slider = document.querySelector('.slider');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const indicators = document.getElementById('indicators');

let currentSlide = 0;
let slideInterval;

// Initialize indicators
function initializeIndicators() {
    const slides = slider.children;
    for (let i = 0; i < slides.length; i++) {
        const indicator = document.createElement('span');
        indicator.dataset.index = i;
        indicators.appendChild(indicator);
        indicator.addEventListener('click', () => {
            currentSlide = i;
            updateSlider();
            restartAutoSlide();
        });
    }
    updateIndicators();
}

// Update slider position
function updateSlider() {
    const sliderWidth = slider.parentElement.clientWidth; // Ширина контейнера
    slider.style.transform = `translateX(-${currentSlide * sliderWidth}px)`;
}

// Update active indicator
function updateIndicators() {
    const allIndicators = indicators.querySelectorAll('span');
    allIndicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Event listeners for navigation buttons
prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide > 0) ? currentSlide - 1 : slider.children.length - 1;
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide < slider.children.length - 1) ? currentSlide + 1 : 0;
    updateSlider();
});

// Automatic slide transition
function autoSlide() {
    slideInterval = setInterval(() => {
        currentSlide = (currentSlide < slider.children.length - 1) ? currentSlide + 1 : 0;
        updateSlider();
    }, 5000);
}

// Restart auto-slide on manual interaction
function restartAutoSlide() {
    clearInterval(slideInterval);
    autoSlide();
}

// Initialize
initializeIndicators();
window.addEventListener('load', updateSlider);
window.addEventListener('resize', updateSlider);
autoSlide();
