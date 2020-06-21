function timer() {
    // ========== таймер ==========
    const closeDate = '2020-06-25';
    setClock('.timer', closeDate);

    function getTimeRemeining (endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 25)),
              minutes = Math.floor((t / (1000 / 60) % 60)),
              seconds = Math.floor((t / 1000) % 60);

        return {
            total: t,
            days,
            hours,
            minutes,
            seconds
        };
    }
    
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timerInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemeining(endtime);

            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);

            if(t.total <= 0) {
                clearInterval(timerInterval);
            }
        }
    }

    function addZero(num) {
        if(num >= 0 && num < 10) {
            return `0${num}`;
        } else if(num < 0) {
            return '00';
        } else {
            return num;
        }
    }
}

module.exports = timer;