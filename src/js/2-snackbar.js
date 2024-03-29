import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
};

function resolveAnswer(delay) {
  iziToast.show({
    message: `✅ Fulfilled promise in ${delay}ms`,
    messageColor: '#FFFFFF',
    backgroundColor: '#59A10D',
    position: 'topRight',
  });
}
function rejectAnswer(delay) {
  iziToast.show({
    message: `❌ Rejected promise in ${delay}ms`,
    messageColor: '#FFF',
    backgroundColor: '#FF0000',
    position: 'topRight',
  });
}
function makePromise() {
  const formEl = refs.form.elements;
  const formData = {
    delay: formEl.delay.value,
    state: formEl.state.value,
  };
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (formData.state === 'fulfilled') {
        resolve(formData.delay);
      } else {
        reject(formData.delay);
      }
    }, Number(formData.delay));
  });
  return promise.then(resolveAnswer).catch(rejectAnswer);
}
function onMessage(e) {
  e.preventDefault();
  makePromise();
}

refs.form.addEventListener('submit', onMessage);
