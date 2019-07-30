let tabs = [];
let timeLimit = defaultTimeLimit;
let timeLimitRadios = document.timeLimitForm.timeLimit;

window.addEventListener('DOMContentLoaded', (event) => {
  // set tabs behaviour
  tabs = document.getElementsByClassName('__se-tab');
  [...tabs].forEach((tab, index) => {
    tab.addEventListener('click', () => { changeTab(index); });
  });

  // set date and time
  const now = new Date();
  document.querySelector('.__se-options-time').innerText = `${now.getHours()}:${now.getMinutes()}`;
  document.querySelector('.__se-options-date').innerText =
    `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`;

  // time limit settings
  chrome.storage.sync.get(['timeLimit'], (items) => {
    timeLimit = items.timeLimit || defaultTimeLimit;
    timeLimitRadios.forEach((radio) => {
      if (radio.value === timeLimit) {
        radio.checked = true;
      }
      radio.addEventListener('change', (event) => {
        timeLimit = parseInt(event.target.value);
        console.log(timeLimit);
        chrome.storage.sync.set({ timeLimit });
      });
    });
  });
});

const changeTab = (index) => {
  const current = document.querySelector('.__se-tab.__se-tab-open');

  if (current) {
    current.classList.remove('__se-tab-open');
  }
  tabs[index].classList.add('__se-tab-open');
}
