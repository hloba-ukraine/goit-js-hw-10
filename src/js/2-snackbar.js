import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
};
const form = document.getElementById('form');
function resolveAnswer() {
  iziToast.show({
    message: `✅ Fulfilled promise in ${form.delay.value}ms`,
    messageColor: '#FFFFFF',
    backgroundColor: '#59A10D',
    position: 'topRight',
  });
}
function rejectAnswer() {
  iziToast.show({
    message: `❌ Rejected promise in ${form.delay.value}ms`,
    messageColor: '#FFF',
    backgroundColor: '#FF0000',
    position: 'topRight',
  });
}
function makePromise() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (form.state.value === 'fulfilled') {
        resolve(form.delay.value);
      }
      reject(form.delay.value);
    }, Number(form.delay.value));
  });
  return promise.then(resolveAnswer).catch(rejectAnswer);
}
function onMessage(e) {
  e.preventDefault();
  makePromise();
}

refs.form.addEventListener('submit', onMessage);
