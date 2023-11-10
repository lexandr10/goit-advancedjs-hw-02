import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');

// Set event listener submit on form
form.addEventListener('submit', onSubmitForm);

// Submit form
function onSubmitForm(e) {
  e.preventDefault();

  let delay = Number(form.delay.value);

  for (let i = 1; i <= form.amount.value; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        iziToast.show({
          message: `✅ Fulfilled promise ${position} in ${delay}ms`,
        });
      })
      .catch(({ position, delay }) => {
        iziToast.show({
          message: `❌ Rejected promise ${position} in ${delay}ms`,
        });
      });
    delay += Number(form.step.value);
  }
}

// Create promise
function createPromise(position, delay) {
  const obj = { position, delay };
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(obj);
      } else {
        // Reject
        reject(obj);
      }
    }, delay);
  });
}
