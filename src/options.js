let dailyNorm = 60;
let spentToday = 17;
var svmPointer, todaysTheSun;

var tabs = document.getElementsByClassName('__se-tab');
    for (let i=0; i<tabs.length; i++) {
        tabs[i].addEventListener("click", function() { 
           changeTab(this.id)
        });
      }

window.onload = function() {
    svmPointer = document.getElementById('se-svm-pointer');
    todaysTheSun = document.getElementById('thesun');
    svmPointer.style['transform'] = 'rotate(58deg)';
    svmSetPointer();
    setTodaysTheSun();
    changeTab('settings');
};

function svmSetPointer() {
    if (spentToday > 0) {
        let dailyNormPercent = dailyNorm / 100;
        let spentTodayPercent = (spentToday - dailyNorm) / dailyNormPercent;
        if (spentTodayPercent > 100) spentTodayPercent = 100;
        let svmPercent = -spentTodayPercent * 0.58; // 58deg Ч max in SiloVoleMetr
        svmPointer.style['transform'] = `rotate(${svmPercent}deg)`;
    }
}

function setTodaysTheSun() {
    let sunPosition = (spentToday / (dailyNorm / 100)) * 2.38;
    let todaysLeftMins = dailyNorm - spentToday;
    todaysTheSun.style['transform'] = `translateY(${sunPosition}px)`;
    if (todaysLeftMins < 0) todaysLeftMins = 0;
    document.getElementById('todays-left-value').innerHTML = todaysLeftMins + ' мин';
}

function changeTab(current) {

    for (let i=0; i<tabs.length; i++) {
        tabs[i].classList.remove("__se-tab-open");
      }
    document.getElementById(current).classList.add('__se-tab-open');
}

// function getDate() {
//     var date = new Date();
//     var hours = date.getHours();
//     var minutes = date.getMinutes();
//     var seconds = date.getSeconds();
//     if(seconds < 10)
//     {
//         seconds = '0' + seconds;
//     }
//     document.getElementById('timedisplay').innerHTML = hours + ':' + minutes + ':' + seconds;
// }
// setInterval(getDate, 0);



// - - - - - - - - - - - - - - - - - - - - - - - // S E T T I N G S 

// - - - - - - - - - - - - - // slider 
