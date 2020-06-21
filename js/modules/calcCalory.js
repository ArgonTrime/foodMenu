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

export default calcCalory;