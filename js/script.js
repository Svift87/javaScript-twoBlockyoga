window.addEventListener('DOMContentLoaded', function () {
    'use strict'

    // табы

    let infoHeaderTab = document.querySelectorAll('.info-header-tab'),  // Создаем переменную с табами
        infoHeader = document.querySelector('.info-header'),            // Создаем переменную с контейнером
        tabContact = document.querySelectorAll('.info-tabcontent');     // Создаем переменную с контентом

    function hideTabContent(a) {                                        // Создаем функцию которая скрывает контент
        for (let i = a; i < tabContact.length; i++) {
            tabContact[i].classList.remove('show');
            tabContact[i].classList.add('hide');
        }
    };

    hideTabContent(1);                                                  // Вызываем функцию с числом один что бы при цикле начиналось все не с первого элемента а со второго

    function showTabContent(b) {                                        // Создаем функцию которая показывает контент если он скрыт
        if (tabContact[b].classList.contains('hide')) {
            tabContact[b].classList.remove('hide');
            tabContact[b].classList.add('show');
        }
    };

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
    });

    // Таймер

    let deadLine = '2019-06-28';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));

        return {
            'total'     : t,
            'hours'     : hours,
            'minuts'    : minutes,
            'seconds'   : seconds
        };
    }

    function setClock (id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock () {
            let t = getTimeRemaining(endtime);

            function timeTest (num) {
                if (num <= 9) {
                    return '0' + num;
                } else {
                    return num;
                }
            }

            hours.textContent = timeTest(t.hours);
            minutes.textContent = timeTest(t.minuts);
            seconds.textContent = timeTest(t.seconds);

            if (t.total <= 0) {
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
                clearInterval(timeInterval);
            }

            // if (seconds.textContent <= 9) {
            //     seconds.textContent = '0' + t.seconds;
            // }

            // if (minutes.textContent <= 9) {
            //     minutes.textContent = '0' + t.minuts;
            // }

            // if (hours.textContent <= 9) {
            //     hours.textContent = '0' + t.hours;
            // }
        }
    };

    setClock('timer', deadLine);

    // modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        popupClose = document.querySelector('.popup-close'),
        descriptionBtn = document.querySelectorAll('.description-btn');
    for (let i = 0; i < descriptionBtn.length; i++) {
        descriptionBtn[i].addEventListener('click', function () {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    }
    

    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    popupClose.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });


    // формы

    let message = {
        loading :   'Загрузка',
        success :   'Спасибо! Скоро мы с вами свяжемся!',
        failure :   'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        let formData = new FormData(form);

        let obj = {

        };

        formData.forEach(function(value, key) {
            obj[key] = value;
        });

        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });

    // Slider

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides (n) {

        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        // for (let i = 0; i < slides.length; i++) {
        //     slides[i].style.display = 'none';
        // }

        dots.forEach((item) => item.classList.remove('dot-active'));
        // for (let i = 0; i < dots.length; i++) {
        //     dots[i].style.display = 'none';
        // }

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function curentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    
    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                curentSlide(i);
            }
        }
    });

    // Calc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDay = document.querySelectorAll('.counter-block-input')[1];
    
});