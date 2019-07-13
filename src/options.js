let dailyNorm = 60;
let spentToday = 17;
var svmPointer, todaysTheSun;

window.onload = function() {
  svmPointer = document.getElementById('se-svm-pointer');
  todaysTheSun = document.getElementById('thesun'); 
  svmPointer.style['transform'] = 'rotate(58deg)';
  svmSetPointer();
  setTodaysTheSun();
};

function svmSetPointer() {
  if (spentToday > 0) {
    let dailyNormPercent = dailyNorm/100;
    let spentTodayPercent = (spentToday-dailyNorm)/dailyNormPercent;
    if (spentTodayPercent>100) spentTodayPercent = 100;
    let svmPercent = -spentTodayPercent*0.58; // 58deg Ч max in SiloVoleMetr
    svmPointer.style['transform'] = `rotate(${svmPercent}deg)`;
  } 
}

function setTodaysTheSun() {
  let sunPosition = (spentToday/(dailyNorm/100))*2.38;
  let todaysLeftMins = dailyNorm-spentToday;
  todaysTheSun.style['transform'] = `translateY(${sunPosition}px)`;
  if (todaysLeftMins<0) todaysLeftMins = 0;
  document.getElementById('todays-left-value').innerHTML = todaysLeftMins+' мин'; 
}