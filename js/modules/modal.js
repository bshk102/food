const showModal = (modalSelector, modalTimerId) => {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    
    if (modalTimerId) {
        clearTimeout(modalTimerId);
    }
};
const closeModal = (modalSelector) => {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
};

function modal(btnsSelector, modalSelector, modalTimerId) {
    const modalBtns = document.querySelectorAll(btnsSelector),
        modal = document.querySelector(modalSelector);

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    };

    modalBtns.forEach(btn => btn.addEventListener('click', () => showModal(modalSelector, modalTimerId)));
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {showModal, closeModal};