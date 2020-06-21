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