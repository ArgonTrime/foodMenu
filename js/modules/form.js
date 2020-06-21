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