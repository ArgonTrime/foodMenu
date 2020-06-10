'use strict';

document.addEventListener('DOMContentLoaded', () => {

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

    // ========== таймер ==========
    const closeDate = '2020-06-11';
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

    // ========== модальное окно ==========

    const modalBtn = document.querySelectorAll('[data-modal]'),
          closeModalBtn = document.querySelector('[data-close]'),
          modal = document.querySelector('.modal'),
          modalTimer = setTimeout(openModal, 10000);

    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimer);
    }

    modalBtn.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
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
    
    new Cards(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        5,
        '.menu .container'
    ).render();

    new Cards(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        10,
        '.menu .container'
    ).render();

    new Cards(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        8,
        '.menu .container'
    ).render();
}); 