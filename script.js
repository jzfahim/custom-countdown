const inputContainer = document.querySelector('#input-container');
const countDownForm = document.querySelector('#countdownForm');
const dateEl = document.querySelector('#date-picker');



const countdownEl = document.querySelector('#countdown')
const countdownElTitle = document.querySelector('#countdown-title')
const countdownBtn = document.querySelector('#countdown-button')
const timeElemets = document.querySelectorAll('span');
const completeEl = document.querySelector('#complete')
const completeElInfo = document.querySelector('#complete-info')
const completeBtn = document.querySelector('#complete-button')

//Populate countDown
function updateDom() {
    countdownactive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour)
        const minutes = Math.floor((distance % hour) / minute)
        const seconds = Math.floor((distance % minute) / second);

        //hide Input
        inputContainer.hidden = true;

        //if the countdown is complete show this
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownactive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
            completeEl.hidden = false;
        }
        else {

            //populate COuntdown
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElemets[0].textContent = ` ${days}`
            timeElemets[1].textContent = ` ${hours}`
            timeElemets[2].textContent = ` ${minutes}`
            timeElemets[3].textContent = ` ${seconds}`
            completeEl.hidden = true;
            countdownEl.hidden = false;

        }
    }, 1000)
}


//set Date input min with today's date;

const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownactive;
let savedCountdown;


const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

function updateCountdown(e) {
    e.preventDefault();
    countdownDate = e.srcElement[1].value;
    countdownTitle = e.srcElement[0].value;

    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown))
    //check for valid date;
    if (countdownDate === '') {
        alert('Plese selec a date for the countDown')
    } else {
        //get nuber version of current time
        countdownValue = new Date(countdownDate).getTime();
        updateDom()
    }
};

//reset values

function reset() {
    //Hide countdown show input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;

    //stop the countdown;
    clearInterval(countdownactive);
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
};

function restorPreviousCountdown() {
    //Get countdown from localStorage if avilable;
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDom()
    }
}

countDownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

//onLoad
restorPreviousCountdown();





