window.addEventListener('DOMContentLoaded', function () {
    'use strict';


    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');


    const hideTabContent = (a) => {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');

        }
    };

    hideTabContent(1);

    const showTabContent = (b) => {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    };

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


    //Timer

    let deadline = '2020-06-30';

    const getTimeRemaining = (endtime) => {
        //quantity mlsc
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));

        if (hours < 10) {
            hours = `0${hours}`;
        }

        if (minutes < 10) {
            minutes = `0${minutes}`;
        }

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }


        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        }
    };



    const setClock = (id, endtime) => {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);


        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;


            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }




    };

    setClock('timer', deadline);


    //Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');


    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    })


    //          let age = document.getElementById('age');

    //  function showUser(surname, name) {
    //           alert("Пользователь " + surname + " " + name + ", его возраст " + this.value);
    //  }

    //  showUser.apply(age, ["Скайвокер","Люк"]);



    //     class Options {
    //         constructor(height, width, bg, fontSize, textAlign) {
    //             this.height = height;
    //             this.width = width;
    //             this.bg = bg;
    //             this.fontSize = fontSize;
    //             this.textAlign = textAlign;
    //         }
    //         createDiv(text) {
    //             let elem = document.createElement('div');
    //             document.body.appendChild(elem);
    //             let param = `height:${this.height}px; width:${this.width}px; background-color:${this.bg}; font-size:${this.fontSize}px; text-align:${this.textAlign}`;
    //             elem.style.cssText = param;
    //     }
    // }
    //     const newDiv = new Options(50, 50, 'orange', 20, 'center');

    //     newDiv.createDiv();



    //Form


    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо!Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так!...',
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');


    statusMessage.classList.add('status');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

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
            } else if (request.readyState === 4 && request.status === 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        })

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });

    //contact form

     

    let contactForm = document.getElementById('form'),
        inputContact = contactForm.getElementsByTagName('input'),
        statMessage = document.createElement('div');


    statMessage.classList.add('status');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        contactForm.appendChild(statMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        let contactFormData = new FormData(contactForm);

        let objec = {};

        contactFormData.forEach(function (value, key) {
            objec[key] = value;
        });

        let jsonF = JSON.stringify(objec);

        request.send(jsonF);

        request.addEventListener('readystatechange', function () {
            if (request.readyState < 4) {
                statMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status === 200) {
                statMessage.innerHTML = message.success;
            } else {
                statMessage.innerHTML = message.failure;
            }
        })

        for (let i = 0; i < inputContact.length; i++) {
            inputContact[i].value = '';
        }
    })

}); 