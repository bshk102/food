import { postData } from '../services/services';
import {closeModal, showModal} from './modal';

function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);

    forms.forEach(form => form.addEventListener('submit', e => {
        e.preventDefault();

        const statusMessages = {
            loading: 'icons/spinner.svg',
            sucsess: 'Спасибо, мы свяжемся с вами',
            failure: 'Ошибка'
        };
        const statusMessage = document.createElement('img');
        statusMessage.src = statusMessages.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);

        let formData = new FormData(form);
        
        formData = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', formData)
            .then(data => {
                console.log(data);
                showThanksModal(statusMessages.sucsess);                
                statusMessage.remove();
            })
            .catch(() => showThanksModal(statusMessages.failure))
            .finally(() => form.reset());

    //     const req = new XMLHttpRequest();
    //     req.open('POST', 'server.php');
    //     req.setRequestHeader('Content-type', 'application/json');
    //     req.send(formData);
    //     req.addEventListener('load', () => {
    //         if (req.status === 200) {
    //             showThanksModal(statusMessages.sucsess);
    //             form.reset();
    //             statusMessage.remove();
    //         } else {
    //             showThanksModal(statusMessages.failure);
    //         }
    //     });
    }));

    function showThanksModal(message) {
        const modalDialog = document.querySelector('.modal__dialog');
        modalDialog.classList.add('hide');
        showModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            modalDialog.classList.add('show');
            modalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;