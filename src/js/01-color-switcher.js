const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const bg = document.querySelector('body');

btnStart.addEventListener('click', handlerStarColor);
btnStop.addEventListener('click', handlerStopColor);
let timerId = null;
btnStop.setAttribute('disabled', 'disabled');
function handlerStarColor(event) {
  event.currentTarget.setAttribute('disabled', 'disabled');
  btnStop.removeAttribute('disabled', 'disabled');
  timerId = setInterval(() => {
    bg.style.backgroundColor = `#${getRandomHexColor()}`;
  }, 1000);
}
function handlerStopColor(event) {
  btnStart.removeAttribute('disabled', 'disabled');
  btnStop.setAttribute('disabled', 'disabled');
  clearInterval(timerId);
}

function getRandomHexColor() {
  return Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0);
}
