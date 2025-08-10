(function (app) {

    app.portfolioProjects = [];
    app.currentProject = {};

    app.homepage = function () {
        setCopyrightYear();
        wireContactForm();
    }

    app.portfolio = function () {
        setCopyrightYear();
    }

    app.workItem = function () {
        setCopyrightYear();
        loadProjectsData();
        loadCurrentProject();
        updatePageData();
    }

    function setCopyrightYear() {
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

    async function loadProjectsData() {
        const cacheData = sessionStorage.getItem('projects');

        if (cacheData !== null) {
            app.portfolioProjects = JSON.parse(cacheData);
        } else {
            const rawData = await fetch('sitedata.json');
            const data = await rawData.json();
            app.portfolioProjects = data;
            sessionStorage.setItem('projects', JSON.stringify(data));
        }
    }


    function loadCurrentProject() {
        const params = new URLSearchParams(window.location.search);
        let item = Number.parseInt(params.get('item'));

        if (item > app.portfolioProjects.length || item < 1) {
            item = 1;
        }

        app.currentProject = app.portfolioProjects[item - 1];
        app.currentProject.id = item;
    }

    function updatePageData() {
        const h2 = document.getElementById('work-item-header');
        h2.innerText = `0${app.currentProject.id}. ${app.currentProject.title}`;

        const img = document.getElementById('work-item-img');
        img.src = app.currentProject.largeImage;
        img.alt = app.currentProject.largeImageAlt;

        const projectP = document.querySelector('#project-text>p');
        projectP.innerText = app.currentProject.projectText;

        const challengesP = document.querySelector('#challenges-text>p');
        challengesP.innerText = app.currentProject.challengesText;

        const ul = document.querySelector('#technologies-text>ul');
        const fragment = new DocumentFragment();
        app.currentProject.technologies.forEach((t) => {
            const li = document.createElement('li');
            li.innerText = t;
            fragment.appendChild(li);
        });
        ul.textContent = '';
        ul.appendChild(fragment);
    }
})(window.app = window.app || {});