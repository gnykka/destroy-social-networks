const dailyNorm = 60;
const msInMin = 1000 * 60; // ms * sec

let spentToday = 0;
let svmPointer, todaysTheSun;

window.addEventListener('DOMContentLoaded', () => {
  svmPointer = document.getElementById('se-svm-pointer');
  todaysTheSun = document.getElementById('thesun');
  svmPointer.style['transform'] = 'rotate(58deg)';


  chrome.storage.sync.get(['time'], (items) => {
    spentToday = Math.round((items.time || 0) / msInMin);

    svmSetPointer();
    setTodaysTheSun();
  });
});

const svmSetPointer = () => {
  if (spentToday > 0) {
    const dailyNormPercent = dailyNorm / 100;
    let spentTodayPercent = (spentToday - dailyNorm) / dailyNormPercent;
    const svmPercent = -spentTodayPercent * 0.58; // 58deg — max in SiloVoleMetr

    if (spentTodayPercent > 100) {
      spentTodayPercent = 100;
    }
    svmPointer.style['transform'] = `rotate(${svmPercent}deg)`;
  }
};

const setTodaysTheSun = () => {
  const sunPosition = (spentToday / (dailyNorm / 100)) * 2.38;
  let todaysLeftMins = dailyNorm - spentToday;

  if (todaysLeftMins < 0) {
    todaysLeftMins = 0;
  }
  todaysTheSun.style['transform'] = `translateY(${sunPosition}px)`;
  document.querySelector('#todays-left-value').textContent = `${todaysLeftMins} мин`;
};

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

// - - - - - - - - - - - - - // S E T T I N G S

// - - - - - - - - - - - - - // slider
