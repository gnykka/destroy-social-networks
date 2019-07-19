let tabs = [];

window.addEventListener('DOMContentLoaded', (event) => {
  tabs = document.getElementsByClassName('__se-tab');
  [...tabs].forEach((tab, index) => {
    tab.addEventListener('click', () => { changeTab(index); });
  });
});

const changeTab = (index) => {
  const current = document.querySelector('.__se-tab.__se-tab-open');

  if (current) {
    current.classList.remove("__se-tab-open");
  }
  tabs[index].classList.add('__se-tab-open');
}
