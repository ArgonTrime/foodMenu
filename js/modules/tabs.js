function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // ========== табы ==========
    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);


    hideTabsContent();
    showTabContent();

    // события на клик табов
    tabsParent.addEventListener('click', event => {
        const target = event.target;

        if(target && target.classList.contains(tabsSelector.slice(1))) {
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
            item.classList.remove(activeClass);
        });
    }

    function showTabContent (index = 0) {
        tabsContent[index].classList.add('show', 'fade');
        tabsContent[index].classList.remove('hide');
        tabs[index].classList.add(activeClass);
    }
}

export default tabs;