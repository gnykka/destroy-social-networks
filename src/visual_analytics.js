let dailyNorm = 60;
const pxInM = 3800;
const defaultTimeLimit = 4;
const msInMin = 1000 * 60; // ms * sec

let spentToday = {
  time:0,
  scroll: 0,
};

let svmPointer, todaysTheSun;

window.addEventListener('DOMContentLoaded', () => {
  svmPointer = document.getElementById('se-svm-pointer');
  todaysTheSun = document.getElementById('thesun');
  svmPointer.style['transform'] = 'rotate(58deg)';


  chrome.storage.sync.get(['time', 'scroll', 'fullTime', 'fullScroll', 'timeLimit'], (items) => {
    spentToday.time = Math.round((items.time || 0) / msInMin);
    spentToday.scroll = Math.round((items.scroll || 0) / pxInM);
    dailyNorm = items.timeLimit || defaultTimeLimit;

    svmSetPointer();
    setTodaysTheSun();
    setTodaysLoose();
  });
});

const svmSetPointer = () => {
  if (spentToday.time > 0) {
    const dailyNormPercent = dailyNorm / 100;
    let spentTodayPercent = (spentToday.time - dailyNorm) / dailyNormPercent;
    const svmPercent = (spentTodayPercent < 100 ? -spentTodayPercent : -100) * 0.57; // 57deg — max in SiloVoleMetr
    svmPointer.style['transform'] = `rotate(${svmPercent}deg)`;
  }
};

const setTodaysTheSun = () => {
  const sunPosition = (spentToday.time / (dailyNorm / 100)) * 2.38;
  let todaysLeftMins = dailyNorm - spentToday.time;

  if (todaysLeftMins < 0) {
    todaysLeftMins = 0;
  }
  todaysTheSun.style['transform'] = `translateY(${sunPosition}px)`;
  document.querySelector('#todays-left-value').textContent = `${todaysLeftMins} мин`;
};

const setTodaysLoose = () => {
  document.querySelector('.__se-counter-value-time').textContent = spentToday.time+' мин.';
  document.querySelector('.__se-counter-value-scroll').textContent = spentToday.scroll+'м';
}

// function getDate() {
//   var date = new Date();
//   var hours = date.getHours();
//   var minutes = date.getMinutes();
//   var seconds = date.getSeconds();
//   if(seconds < 10) {
//     seconds = '0' + seconds;
//   }
//   document.getElementById('timedisplay').innerHTML = hours + ':' + minutes + ':' + seconds;
// }
// setInterval(getDate, 0);
