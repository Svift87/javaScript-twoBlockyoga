window.addEventListener('DOMContentLoaded', function () {
    'use strict'

    let infoHeaderTab = document.querySelectorAll('.info-header-tab'),  // Создаем переменную с табами
        infoHeader = document.querySelector('.info-header'),            // Создаем переменную с контейнером
        tabContact = document.querySelectorAll('.info-tabcontent');     // Создаем переменную с контентом

    function hideTabContent(a) {                                        // Создаем функцию которая скрывает контент
        for (let i = a; i < tabContact.length; i++) {
            tabContact[i].classList.remove('show');
            tabContact[i].classList.add('hide');
        }
    }

    hideTabContent(1);                                                  // Вызываем функцию с числом один что бы при цикле начиналось все не с первого элемента а со второго

    function showTabContent(b) {                                        // Создаем функцию которая показывает контент если он скрыт
        if (tabContact[b].classList.contains('hide')) {
            tabContact[b].classList.remove('hide');
            tabContact[b].classList.add('show');
        }
    }

    infoHeader.addEventListener('click', function (event) {             //
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < infoHeaderTab.length; i++) {
                if (target == infoHeaderTab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    })
})