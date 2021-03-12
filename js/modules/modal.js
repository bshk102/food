function modal() {
    const modalBtns = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    const showModal = () => {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimerId);
        window.removeEventListener('scroll', showModalByScroll);
    };
    const closeModal = () => {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    };

    const modalTimerId = setTimeout(showModal, 15000);

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
        }
    };

    modalBtns.forEach(btn => btn.addEventListener('click', showModal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;