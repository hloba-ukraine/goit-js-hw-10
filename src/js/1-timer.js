import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconClose from '../img/bi_x-octagon.png';

const refs = {
  inputEl: document.querySelector('.input-field'),
  btnStart: document.querySelector('.start-btn'),
  dataDay: document.querySelector('span[data-days]'),
  dataHours: document.querySelector('span[data-hours]'),
  dataMinutes: document.querySelector('span[data-minutes]'),
  dataSeconds: document.querySelector('span[data-seconds]'),
};
let userSelectedDate;
let difference;
let timerInterval;
refs.btnStart.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    difference = userSelectedDate.getTime() - Date.now();
    if (userSelectedDate < Date.now()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#FFF',
        backgroundColor: '#FF0000',
        position: 'topRight',
        iconUrl: iconClose,
      });
    } else {
      refs.btnStart.disabled = false;
    }
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
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
function onTimer(difference) {
  const timer = convertMs(difference);
  refs.dataDay.textContent = `${addLeadingZero(timer.days)}`;
  refs.dataHours.textContent = `${addLeadingZero(timer.hours)}`;
  refs.dataMinutes.textContent = `${addLeadingZero(timer.minutes)}`;
  refs.dataSeconds.textContent = `${addLeadingZero(timer.seconds)}`;
}
function onStart() {
  timerInterval = setInterval(() => {
    if (difference <= 0) {
      clearInterval(timerInterval);
    } else {
      onTimer(difference);
      difference -= 1000;
    }
  }, 1000);
  refs.btnStart.disabled = true;
  refs.inputEl.disabled = true;
}

flatpickr('#datetime-picker', options);
refs.btnStart.addEventListener('click', onStart);
