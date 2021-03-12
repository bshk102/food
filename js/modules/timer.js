function timer() {
    const deadline = new Date(2021, 2, 1, 0, 0),
        htmlDays = document.querySelector('#days'),
        htmlHours = document.querySelector('#hours'),
        htmlMinutes = document.querySelector('#minutes'),
        htmlSeconds = document.querySelector('#seconds');

    const getTimeLeft = (deadline) => {
        let currentDate = new Date();
        let timeLeft = deadline - currentDate;

        let days = Math.floor(timeLeft / 1000 / 60 / 60 / 24),
            hours = Math.floor((timeLeft / 1000 / 60 / 60) % 24),
            minutes = Math.floor((timeLeft / 1000 / 60) % 60),
            seconds = Math.floor((timeLeft / 1000) % 60);

        return { timeLeft, days, hours, minutes, seconds };
    };

    const renderTimeLeft = (timerHTML, timeLeft) => {
        if (timeLeft.timeLeft <= 0) {
            timerHTML.querySelector('.title').textContent = 'Акция завершена';
            timerHTML.querySelector('.timer').innerHTML = '';
            clearInterval(startTimer);
        }
        htmlDays.textContent = drawZero(timeLeft.days);
        htmlHours.textContent = drawZero(timeLeft.hours);
        htmlMinutes.textContent = drawZero(timeLeft.minutes);
        htmlSeconds.textContent = drawZero(timeLeft.seconds);
    };

    const drawZero = num => num < 10 ? `0${num}` : num;

    const startTimer = setInterval(() => {
        renderTimeLeft(document.querySelector('.promotion__timer'), getTimeLeft(deadline));
    }, 1000);

    renderTimeLeft(document.querySelector('.promotion__timer'), getTimeLeft(deadline));

}

module.exports = timer;