window.addEventListener('DOMContentLoaded', function () {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        btn = document.querySelectorAll('.description-btn'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
    //Таймер
    let deadline = "2019-08-10";

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()), // В t сейчас колличество миллисекунд дата дедлайн-дата сейчас и в миллесекунда с 1.1.1970  
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));

        // hoursmod = Math.floor((t/1000/60/60) % 24),
        // days  = Math.floor((t/(1000*60*60*24)));
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);


        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num) {

                if (num <= 9) {
                    return '0' + num;
                } else return num;
            };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }

        }

    }
    setClock('timer', deadline);

    //Модальное окно

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');


    more.addEventListener('click', function () {
        overlay.style.display = "block";
        this.classList.add('more-splash');
        document.body.style.overflow = "hidden";

    });
    close.addEventListener('click', function () {
        overlay.style.display = "none";
        more.classList.remove('more-splash');
        document.body.style.overflow = "";
    });

    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', function () {
            overlay.style.display = "block";
        });
    };

    //AJAX GET / POST       
    let message = { // ajax переменные для вывода в мольном окне
        loading: 'Загрузка...',
        success: 'Спасибо! Мы с вами свяжемся',
        failure: 'Что-то пошло не так....'
    };
    let form = document.querySelector('.main-form'), // Парсим форму по тегам .main-form
        input = form.getElementsByTagName('input'), // Парсим инпут
        statusMessage = document.createElement('div'); // Создаем пустой див в форме

    statusMessage.classList.add('status'); //Добавляем класс статус

    form.addEventListener('submit', function (e) { // Submit нажал - записываем ивент с формы
        e.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest(); // Создаем http запрос 
        request.open('POST', 'server.php'); // Постим через server.php
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8'); //передаем в json
        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function (value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function () {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {

                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = "";

        }
    });

    //Слайдер 
    let slideIndex = 1, //Индекс слайдов Index Slides
        slides = document.querySelectorAll('.slider-item'), // Парсим картинку по классу в массив
        prev = document.querySelector('.prev'), // Парсим div с классом prev кнопка предыдущий
        next = document.querySelector('.next'), // Парсим div с классом next кнопка следущий
        dotsWrap = document.querySelector('.slider-dots'), // обёртка точки
        dots = document.querySelectorAll('.dot'); // точки
    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        // 1-й способ перебора массива и добавления стиля дисплей нон
        slides.forEach((item) => item.style.display = "none");
        // Перебор через for
        // for (let i=0; i < slides.length; i++){
        //     slides[i].style.display = "none";
        // }
        dots.forEach((item) => item.classList.remove('dot-active'));
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active')
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);

    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    prev.addEventListener('click', function () {
        plusSlides(-1);
    });
    next.addEventListener('click', function () {
        plusSlides(1);
    });
    dotsWrap.addEventListener('click', function (e) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (e.target.classList.contains('dot') && e.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });
    // Калькулятор

    let persons = document.querySelectorAll('.counter-block-input')[0],
        days = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daySum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('change', function () {
        personsSum = +this.value;
        total = (daySum + personsSum) * 4000;
        if (days.value == '' ) {
            totalValue.innerHTML = 0;

        } else {
            totalValue.innerHTML = total;
        }
    });
    days.addEventListener('change', function () {
        daySum = +this.value;
        total = (daySum + personsSum) * 4000;
        if (persons.value == '') {
            totalValue.innerHTML = 0;

        } else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener('change', function () {
        if (days.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a*this.options[this.selectedIndex].value;
        }
    });
});