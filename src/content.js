let phase = 0;
const times = [10000, 10000, 10000, 10000]; // in ms

const storageUpdateTime = 5000;
const stickerVisibleTime = 2000;
const toasterAnimationTime = 500;

let sticker, sprite, serfer;

// get scroll and time values
let scroll, fullScroll;
let time, fullTime;
let prevScrollTop = 0;

let today = new Date();
let dateTime = (new Date(today.getFullYear(), today.getMonth(), today.getDate())).getTime();

chrome.storage.sync.get(['scroll', 'full_scroll'], (items) => {
  scroll = items.scroll || 0;
  fullScroll = items.full_scroll || 0;
});

// write new values to storage
const storageTimer = setInterval(() => {
  today = new Date();
  const nextDateTime = (new Date(today.getFullYear(), today.getMonth(), today.getDate())).getTime();

  if (nextDateTime > dateTime) {
    scroll = 0;
    dateTime = nextDateTime;
  }

  chrome.storage.sync.set({ scroll: scroll, full_scroll: fullScroll });
}, storageUpdateTime);

const onScroll = debounce((event) => {
  const { scrollTop } = event.target.scrollingElement;

  delta = Math.abs(scrollTop - prevScrollTop);
  scroll += delta;
  fullScroll += delta;
  prevScrollTop = scrollTop;
}, this);

const onUnload = () => {
  window.removeEventListener(onScroll);
  clearInterval(storageTimer);
}

const renderResources = () => {
  // create container for stickers
  sticker = document.createElement('div');
  sticker.className = '__se-sticker';
  sticker.innerText = '';
  document.body.appendChild(sticker);

  // create serfer
  sprite = document.createElement('div');
  serfer = chrome.extension.getURL('assets/images/serf-1.png');
  sprite.className = '__se-sprite';
  sprite.style['background-image'] = `url('${serfer}')`;
  document.body.appendChild(sprite);
}

const showSticker = (text) => {
  sticker.innerText = text;
  sticker.classList.add('visible');

  setTimeout(() => { sticker.classList.remove('visible'); }, stickerVisibleTime);
};

const firstPhase = () => {
  setTimeout(secondPhase, times[phase]);
};

const secondPhase = () => {
  phase += 1;
  showSticker('Закончилась первая фаза, начало второй фазы');
  setTimeout(thirdPhase, times[phase]);
};

const thirdPhase = () => {
  phase += 1;
  showSticker('Закончилась вторая фаза, начало третьей фазы');
  setTimeout(forthPhase, times[phase]);
};

const forthPhase = () => {
  phase += 1;
  showSticker('Закончилась третья фаза, начало четвёртой фазы');
  setTimeout(fifthPhase, times[phase]);
};

const fifthPhase = () => {
  phase += 1;
  showSticker('Закончилась последняя, четвёртая фаза');
  sprite.classList.add('hidden');
};

// start calculating scroll
window.addEventListener('scroll', onScroll, true);
// remove interval before unload
window.addEventListener('beforeunload', onUnload, true);

// create stickers and serfer
renderResources();

// start the phases
firstPhase();
