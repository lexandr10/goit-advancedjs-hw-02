import flatpickr from 'flatpickr';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'flatpickr/dist/flatpickr.min.css';
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

elements.btnStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    pickDate(selectedDates[0]);
  },
};
flatpickr(elements.inputPickDate, options);

function pickDate(selectedDates) {
  const current = Date.now();
  if (selectedDates < current) {
    return alert('Please choose a date in the future');
  }
  timeDifference = selectedDates.getTime() - current;
  formatDate = convertMs(timeDifference);
  renderDate(formatDate);
  elements.btnStart.removeAttribute('disabled', true);
}
elements.btnStart.addEventListener('click', handlerStart);

function handlerStart(event) {
  timerId = setInterval(startTime, 1000);
}
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

function startTime() {
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

window.addEventListener('keydown', e => {
  if (e.code === 'Escape' && timerId) {
    clearInterval(timerId);

    imputDatePickerRef.removeAttribute('disabled');
    btnStartRef.setAttribute('disabled', true);

    secondsRef.textContent = '00';
    minutesRef.textContent = '00';
    hoursRef.textContent = '00';
    daysRef.textContent = '00';
  }
});
function renderDate(formatDate) {
  elements.seconds.textContent = formatDate.seconds;
  elements.minutes.textContent = formatDate.minutes;
  elements.hours.textContent = formatDate.hours;
  elements.days.textContent = formatDate.days;
}
