

document.querySelector('.burger__menu').addEventListener('click',function() {
    this.classList.toggle('active');
    document.querySelector('.nav__menu').classList.toggle('open');
})

document.addEventListener('DOMContentLoaded', function() {
    const likeElement = document.querySelector('.like');
    const tripCardLike = document.querySelector('.tripCard__like');

    likeElement.addEventListener('mouseenter', function() {
        tripCardLike.classList.add('active');
    });

    likeElement.addEventListener('mouseleave', function() {
        tripCardLike.classList.remove('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.carousel__inner');
    const carouselItems = document.querySelectorAll('.carousel__slide');
    const dotsContainer = document.querySelector('.carousel__dots');
    let currentIndex = 0;

    // Создаем точки для карусели
    carouselItems.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel__dots span');

    // Функция для перехода к конкретному слайду
    function goToSlide(index) {
        if (index < 0 || index >= carouselItems.length) return;

        carouselInner.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        updateDots();
    }

    // Обновление активной точки
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Инициализация первой точки
    updateDots();

    // Автоматическая смена слайдов
    setInterval(() => {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        goToSlide(currentIndex);
    }, 4000);
    
});


const sliderData = {
    slide1: {
        image: "image/testimonials/avatar.svg",
        comment: "“On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.”",
        name: "Mike taylor1",
        info: "Lahore, Pakistan"
    },
    slide2: {
        image: "image/testimonials/avatar.svg",
        comment: "“On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.”",
        name: "Mike taylor2",
        info: "Lahore, Pakistan"
    },
    slide3: {
        image: "image/testimonials/avatar.svg",
        comment: "“On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.”",
        name: "Mike taylor3",
        info: "Lahore, Pakistan"
    },
    slide4: {
        image: "image/testimonials/avatar.svg",
        comment: "“On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.”",
        name: "Mike taylor4",
        info: "Lahore, Pakistan"
    }
};

let currentIndex = 0;
const slides = Object.keys(sliderData);
const container = document.querySelector('.review__container');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let isAnimating = false;

function renderSlide(index) {
    const slide = sliderData[slides[index]];
    return `
        <div class="review__element" data-index="${index}">
            <div class="review__avatar">
                <img src="${slide.image}" alt="${slide.name}">
            </div>
            <div class="review__item">
                <div class="review__text">
                    <p class="review__comment">${slide.comment}</p>
                    <h4 class="review__name">${slide.name}</h4>
                    <p class="review__info">${slide.info}</p>
                </div>
            </div>
        </div>
    `;
}

function updateSlider(direction) {
    if (isAnimating) return;
    isAnimating = true;

    const currentSlideIndex1 = (currentIndex) % slides.length;

    const nextIndex = direction === 'next' ? (currentIndex + 2) % slides.length : (currentIndex - 1 + slides.length) % slides.length;

    const currentSlide = container.querySelector(`[data-index="${currentSlideIndex1}"]`);

    if (!currentSlide) {
        console.error("Не удалось найти слайд для анимации.");
        isAnimating = false;
        return;
    }

    currentSlide.classList.add(direction === 'next' ? 'slide-out-down' : 'slide-out-up');
    prevButton.style.pointerEvents = 'none';
    nextButton.style.pointerEvents = 'none';

    setTimeout(() => {
        currentSlide.remove();
        currentIndex = (direction === 'next') ? (currentIndex + 1) % slides.length : (currentIndex - 1 + slides.length) % slides.length;
            const nextSlidesHTML = renderSlide(currentIndex) + renderSlide((currentIndex + 1) % slides.length);
        container.innerHTML = nextSlidesHTML
        const newSlideElement = container.querySelector(`[data-index="${nextIndex}"]`);
            if (newSlideElement) {
                newSlideElement.classList.add('slide-in');
            }
        updateButtonsState();
        setTimeout(() => {
            prevButton.style.pointerEvents = 'auto';
            nextButton.style.pointerEvents = 'auto';
            if (newSlideElement) {
                newSlideElement.classList.remove('slide-in');
            }

            isAnimating = false;
        }, 300);
    }, 300);
}

prevButton.addEventListener('click', () => {
    if (!prevButton.classList.contains('disabled')) {
        updateSlider('prev');
    }
});

nextButton.addEventListener('click', () => {
    if (!nextButton.classList.contains('disabled')) {
        updateSlider('next');
    }
});

function updateButtonsState() {
    prevButton.classList.toggle('disabled', currentIndex === 0);
    nextButton.classList.toggle('disabled', currentIndex >= slides.length - 1);
}
container.innerHTML = renderSlide(currentIndex) + renderSlide((currentIndex + 1) % slides.length);
updateButtonsState();





