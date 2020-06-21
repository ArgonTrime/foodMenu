function slider({container, slide, next, prev, currentSlide, totalSlides, wrapper, field}) {
    // ========== слайдер ==========
    // слайдер карусель
    const slider = document.querySelector(container),
          sliderPrev = document.querySelector(prev),
          sliderNext = document.querySelector(next),
          offerSlides = document.querySelectorAll(slide),
          current = document.querySelector(currentSlide),
          total = document.querySelector(totalSlides),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideNumber = 1,
        offset = 0;

    if(offerSlides.length < 10) {
        current.textContent = `0${slideNumber}`;
        total.textContent = `0${offerSlides.length}`;
    } else {
        current.textContent = slideNumber;
        total.textContent = offerSlides.length;
    }

    slidesField.style.width = 100 * offerSlides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    offerSlides.forEach(slide => {
        slide.style.width = width;
    });

    // индикаторы слайдера
    slider.style.position = 'relative';
    const sliderIndicators = document.createElement('ol'),
          dots = [];
    sliderIndicators.classList.add('slider-indicators');
    sliderIndicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(sliderIndicators);

    for(let i = 0; i < offerSlides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if(i == 0) {
            dot.style.opacity = 1;
        }

        sliderIndicators.append(dot);
        dots.push(dot);
    }

    sliderNext.addEventListener('click', () => {

        if(offset === changeStrInNumber(width) * (offerSlides.length - 1)) {
            offset = 0;
        } else {
            offset += changeStrInNumber(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideNumber == offerSlides.length) {
            slideNumber = 1;
        } else {
            slideNumber++;
        }

        slideNumberZero();
        dotOpacity();
    });

    sliderPrev.addEventListener('click', () => {

        if(offset === 0) {
            offset = changeStrInNumber(width) * (offerSlides.length - 1);
        } else {
            offset -= changeStrInNumber(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideNumber == 1) {
            slideNumber = offerSlides.length;
        } else {
            slideNumber--;
        }

        slideNumberZero();
        dotOpacity();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideNumber = slideTo;
            offset = changeStrInNumber(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            
            slideNumberZero();
            dotOpacity();
        });
    });

    function dotOpacity() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideNumber - 1].style.opacity = 1;
    }
    function slideNumberZero() {
        if(offerSlides.length < 10) {
            current.textContent = `0${slideNumber}`;
        } else {
            current.textContent = slideNumber;
        }
    }
    function changeStrInNumber(str) {
        return +str.replace(/\D/g, '');
    }
}

export default slider;