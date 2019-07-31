window.addEventListener('DOMContentLoaded', () => {
  const icon = document.querySelector('.__se-settings-icon');
  icon.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
});