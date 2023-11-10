import flatpickr from 'flatpickr';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let timeDifference = 0;
let timerId = null;
let formatDate = null;
const elements = {
  btnStart: document.querySelector('.btn-start'),
  inputPickDate: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentDifferenceDate(selectedDates[0]);
    console.log(selectedDates[0]);
  },
};
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
flatpickr(elements.inputPickDate, options);
elements.btnStart.setAttribute('disabled', 'disabled');

elements.btnStart.addEventListener('click', handlerOnTime);

function handlerOnTime() {
  timerId = setInterval(startTimer, 1000);
}

window.addEventListener('keydown', e => {
  if (e.code === 'Escape' && timerId) {
    clearInterval(timerId);

    elements.inputPickDate.removeAttribute('disabled');
    elements.btnStart.setAttribute('disabled', true);

    elements.seconds.textContent = '00';
    elements.minutes.textContent = '00';
    elements.hours.textContent = '00';
    elements.days.textContent = '00';
  }
});

function startTimer() {
  elements.btnStart.setAttribute('disabled', true);
  elements.inputPickDate.setAttribute('disabled', true);

  timeDifference -= 1000;

  if (elements.seconds.textContent <= 0 && elements.minutes.textContent <= 0) {
    alert('Time end');
    clearInterval(timerId);
  } else {
    formatDate = convertMs(timeDifference);
    renderDate(formatDate);
  }
}
function renderDate(formatDate) {
  elements.seconds.textContent = formatDate.seconds;
  elements.minutes.textContent = formatDate.minutes;
  elements.hours.textContent = formatDate.hours;
  elements.days.textContent = formatDate.days;
}

function currentDifferenceDate(selectedDates) {
  const currentDate = Date.now();

  if (selectedDates < currentDate) {
    elements.btnStart.setAttribute('disabled', true);
    return alert('Please choose a date in the future');
  }

  timeDifference = selectedDates.getTime() - currentDate;
  formatDate = convertMs(timeDifference);

  renderDate(formatDate);
  elements.btnStart.removeAttribute('disabled');
}
