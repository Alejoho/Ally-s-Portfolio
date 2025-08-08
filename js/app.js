(function (app) {

    app.homepage = function () {
        setCurrentYear();
        wireContactForm();
    }

    app.portfolio = function () {
        setCurrentYear();
    }

    app.workItem = function () {
        setCurrentYear();
    }

    function setCurrentYear() {
        const year = new Date().getFullYear();
        const spanYear = document.getElementById('copyright-year');
        spanYear.innerText = year;
    }

    function wireContactForm() {
        const contactForm = document.getElementById('contact-form');
        contactForm.addEventListener('submit', contactFormSubmit);
    }

    function contactFormSubmit(e) {
        e.preventDefault()

        const form = document.getElementById('contact-form');
        const name = form.querySelector('#name');
        const email = form.querySelector('#email');
        const message = form.querySelector('#message');

        const mailTo = `mailto:${email.value}?subject=Contact From ${name.value}&body=${message.value}`

        window.open(mailTo);

        name.value = '';
        email.value = '';
        message.value = '';
    }
})(window.app = window.app || {})