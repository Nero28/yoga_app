function form() {


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


    // statMessage.classList.add('status');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        contactForm.appendChild(statMessage);


        function postData(data) {
            return new Promise(function (resolve, reject) {

                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                // let contactFormData = new FormData(contactForm);

                //let objec = {};

                //  contactFormData.forEach(function (value, key) {
                //      data[key] = value;
                // });

                // let jsonF = JSON.stringify(data);

                // request.send(jsonF);

                request.addEventListener('readystatechange', function () {
                    if (request.readyState < 4) {
                        resolve();
                        //statMessage.innerHTML = message.loading;
                    } else if (request.readyState === 4 && request.status === 200) {
                        resolve();
                        //statMessage.innerHTML = message.success;
                    } else {
                        reject();
                        // statMessage.innerHTML = message.failure;
                    }
                })

                let contactFormData = new FormData(data);

                let objec = {};

                contactFormData.forEach(function (value, key) {
                    objec[key] = value;
                });

                let jsonF = JSON.stringify(objec);

                request.send(jsonF);

            })
        }


        function clearInput() {
            for (let i = 0; i < inputContact.length; i++) {
                inputContact[i].value = '';
            }
        }

        postData(contactForm)
            .then(() => statMessage.innerHTML = message.loading)
            .then(() => {
                statMessage.innerHTML = message.success;
            })
            .catch(() => statusMessage.innerHTML = message.failure)
            .then(clearInput)
    });
};

module.exports = form;