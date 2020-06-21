/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calcCalory.js":
/*!**********************************!*\
  !*** ./js/modules/calcCalory.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calcCalory() {
    // ========== калькулятор активности ==========

    const result = document.querySelector('.calculating__result span');
    let gender,
        height,
        weight,
        age,
        ratio;

    if(localStorage.getItem('gender')){
        gender = localStorage.getItem('gender');
    } else {
        gender = 'woman';
        localStorage.setItem('gender', 'woman');
    }

    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalData(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.classList.remove(activeClass);
            
            if(element.getAttribute('id') === localStorage.getItem('gender')) {
                element.classList.add(activeClass);
            }
            if(element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                element.classList.add(activeClass);
            }
        });
    }

    initLocalData('#gender div', 'calculating__choose-item_active');
    initLocalData('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcCalorys() {
        if(!gender || !height || !weight || !age || !ratio) {
            result.textContent = '0';
            return;
        }

        if(gender === 'woman') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcCalorys();

    function getInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    gender = e.target.getAttribute('id');
                    localStorage.setItem('gender', e.target.getAttribute('id'));
                }
    
                elements.forEach(element => {
                    element.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);

                calcCalorys();
            });
        });       
    }

    getInformation('#gender div', 'calculating__choose-item_active');
    getInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getInputInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcCalorys();
        });

        
    }

    getInputInformation('#height');
    getInputInformation('#weight');
    getInputInformation('#age');
}

module.exports = calcCalory;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function cards() {
    // ========== карточки ========== 
    class Cards {
        constructor(srcImg, alt, title, text, price, parentSelector, ...classes) {
            this.srcImg = srcImg;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.parentElement = document.querySelector(parentSelector);
            this.classes = classes;
            this.blrPrice = 2.3785;
            this.changePriceBlr();
        }
        
        changePriceBlr() {
            this.price = Math.floor(this.price * this.blrPrice);
        }

        render() {
            const element = document.createElement('div');

            if(this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.srcImg} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>   
            `;
            this.parentElement.append(element);
        }
    }
    
    const getResourse = async (url) => {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getResourse('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new Cards(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function form() {
    // ========== отправка форм ==========

    const forms = document.querySelectorAll('form'),
          messageForUser = {
              loading: 'icons/spiner.svg',
              success: 'Принято, скоро с вами свяжемся!',
              fail: 'Что-то сломалось'
          };

    forms.forEach(form => {
        bindPostData(form);
    });

    const postData = async (url, data) => {
        const res = await fetch(url , {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data 
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form),
                  statusMessageForUser = document.createElement('img'),
                  objectForJSONSend = {};

            statusMessageForUser.src = messageForUser.loading;
            statusMessageForUser.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessageForUser);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showModalComplete(messageForUser.success);
                statusMessageForUser.remove();
                form.reset();
            })
            .catch(() => {
                showModalComplete(messageForUser.fail);
            })
            .finally(() => {
                form.reset();
            });
        });
    }

    function showModalComplete(message) {
        const modalComplete = document.querySelector('.modal__dialog');
        
        modalComplete.classList.add('hide');
        openModal();

        const modalCompleteWrapper = document.createElement('div');
        modalCompleteWrapper.classList.add('modal__dialog');
        modalCompleteWrapper.innerHTML = `
            <div class='modal__content'>
                <div class='modal__close' data-close>&times;</div>
                <div class='modal__title'>${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(modalCompleteWrapper);
        setTimeout(() => {
            modalCompleteWrapper.remove();
            modalComplete.classList.add('show');
            modalComplete.classList.remove('hide');
            closeModal();
        }, 4000);
    }
}

module.exports = form;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal() {
    // ========== модальное окно ==========

    const modalBtn = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalTimer = setTimeout(openModal, 50000);

    function closeModal() {
        // modal.classList.toggle('show');
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        // modal.classList.toggle('show');
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimer);
    }

    modalBtn.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    function showModalScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalScroll);
        }
    }

    window.addEventListener('scroll', showModalScroll);

}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider() {
    // ========== слайдер ==========
    /*
    const sliderPrev = document.querySelector('.offer__slider-prev'),
          sliderNext = document.querySelector('.offer__slider-next'),
          offerSlides = document.querySelectorAll('.offer__slide'),
          current = document.querySelector('#current'),
          total = document.querySelector('#total');

    let slideNumber = 1;

    showSlide(slideNumber);
    showTotalSlide();
    sliderPrev.addEventListener('click', () => {
        moveSlides(-1);
    });
    sliderNext.addEventListener('click', () => {
        moveSlides(1);
    });

    function showSlide(numberSlide) {
        if(numberSlide > offerSlides.length) {
            slideNumber = 1;
        }

        if(numberSlide < 1) {
            slideNumber = offerSlides.length;
        }

        offerSlides.forEach(slide => slide.classList.add('hide'));
        offerSlides[slideNumber - 1].classList.remove('hide');
        showCurrentSlide();
    }

    function showTotalSlide() {
        if(offerSlides.length < 10) {
            total.textContent = `0${offerSlides.length}`;
        } else {
            total.textContent = offerSlides.length;
        }
    }
    
    function showCurrentSlide() {
        if(offerSlides.length < 10) {
            current.textContent = `0${slideNumber}`;
        } else {
            current.textContent = slideNumber;
        }
    }

    function moveSlides(move) {
        showSlide(slideNumber += move);
    }
    */
    
    // слайдер карусель
    const slider = document.querySelector('.offer__slider'),
          sliderPrev = document.querySelector('.offer__slider-prev'),
          sliderNext = document.querySelector('.offer__slider-next'),
          offerSlides = document.querySelectorAll('.offer__slide'),
          current = document.querySelector('#current'),
          total = document.querySelector('#total'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
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

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs() {
    // ========== табы ==========
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');


    hideTabsContent();
    showTabContent();

    // события на клик табов
    tabsParent.addEventListener('click', event => {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((tab, index) => {
                if(target == tab) {
                    hideTabsContent();
                    showTabContent(index); 
                }
            });
        }
    });

    // функции     
    function hideTabsContent () {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');

            
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent (index = 0) {
        tabsContent[index].classList.add('show', 'fade');
        tabsContent[index].classList.remove('hide');
        tabs[index].classList.add('tabheader__item_active');
    }
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {
    // ========== таймер ==========
    const closeDate = '2020-06-25';
    setClock('.timer', closeDate);

    function getTimeRemeining (endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 25)),
              minutes = Math.floor((t / (1000 / 60) % 60)),
              seconds = Math.floor((t / 1000) % 60);

        return {
            total: t,
            days,
            hours,
            minutes,
            seconds
        };
    }
    
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timerInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemeining(endtime);

            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);

            if(t.total <= 0) {
                clearInterval(timerInterval);
            }
        }
    }

    function addZero(num) {
        if(num >= 0 && num < 10) {
            return `0${num}`;
        } else if(num < 0) {
            return '00';
        } else {
            return num;
        }
    }
}

module.exports = timer;

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener('DOMContentLoaded', () => {
    const calcCalory = __webpack_require__(/*! ./modules/calcCalory */ "./js/modules/calcCalory.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          form = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
          tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

    calcCalory();
    cards();
    form();
    modal();
    slider();
    tabs();
    timer();
}); 

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map