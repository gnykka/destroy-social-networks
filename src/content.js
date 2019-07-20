let phase = 0;
const times = [2000, 4000, 2000]; // in ms

// 1 фаза — улыбающийся серфер (25%)
// 2 фаза — хмурый серфер (50%)
// 3 фаза — злой серфер (25%)

const storageUpdateTime = 5000;
const stickerVisibleTime = 2000;
const toasterAnimationTime = 500;

let sticker, sprite;

let today = new Date();
let dateTime = (new Date(today.getFullYear(), today.getMonth(), today.getDate())).getTime();

// get scroll and time values
let scroll, fullScroll;
let time, fullTime;
let prevScrollTop = 0;
let prevTime = today.getTime();

chrome.storage.sync.get(['scroll', 'fullScroll', 'time', 'fullTime'], (items) => {
  scroll = items.scroll || 0;
  fullScroll = items.fullScroll || 0;
  time = items.time || 0;
  fullTime = items.fullTime || 0;
});

// write new values to storage
const storageTimer = setInterval(() => {
  today = new Date();
  const nextDateTime = (new Date(today.getFullYear(), today.getMonth(), today.getDate())).getTime();

  const delta = today.getTime() - prevTime;
  time += delta;
  fullTime += delta;
  prevTime = today.getTime();

  if (nextDateTime > dateTime) {
    scroll = 0;
    time = 0;
    dateTime = nextDateTime;
  }

  chrome.storage.sync.set({ scroll, fullScroll, time, fullTime });
}, storageUpdateTime);

const onScroll = debounce((event) => {
  const { scrollTop } = event.target.scrollingElement;

  delta = Math.abs(scrollTop - prevScrollTop);
  scroll += delta;
  fullScroll += delta;
  prevScrollTop = scrollTop;
}, this);

const onUnload = () => {
  window.removeEventListener('scroll', onScroll);
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
  sprite.className = '__se-sprite';
  document.body.appendChild(sprite);
}

const showSticker = (text) => {
  sticker.innerText = text;
  sticker.classList.add('visible');

  setTimeout(() => { sticker.classList.remove('visible'); }, stickerVisibleTime);
};

const firstPhase = () => {
  showSticker('Сёрфер радостный');

  const image = chrome.extension.getURL('assets/images/serf-1-happy.png');
  sprite.style['background-image'] = `url('${image}')`;
  sprite.classList.add('__se-sprite-happy');

  /*
  const image = chrome.extension.getURL('assets/images/serf-2-happy-talk.png');
  sprite.style['background-image'] = `url('${image}')`;
  sprite.classList.add('__se-sprite-happy-talk');
  */

  setTimeout(() => {
    const image = chrome.extension.getURL('assets/images/serf-3-happy-transition.png');
    sprite.style['background-image'] = `url('${image}')`;
    sprite.classList.add('__se-sprite-happy-transition');
    sprite.classList.remove('__se-sprite-happy');

    setTimeout(secondPhase, 1000);
  }, times[phase]);
};

const secondPhase = () => {
  phase += 1;
  showSticker('Сёрфер растроен');

  const image = chrome.extension.getURL('assets/images/serf-4-concerned.png');
  sprite.style['background-image'] = `url('${image}')`;
  sprite.classList.add('__se-sprite-conserned');
  sprite.classList.remove('__se-sprite-happy-transition');

  /*
  const image = chrome.extension.getURL('assets/images/serf-5-concerned-talk.png');
  sprite.style['background-image'] = `url('${image}')`;
  sprite.classList.add('__se-sprite-conserned-talk');
  */

  setTimeout(() => {
    const image = chrome.extension.getURL('assets/images/serf-6-concerned-transition.png');
    sprite.style['background-image'] = `url('${image}')`;
    sprite.classList.add('__se-sprite-concerned-transition');
    sprite.classList.remove('__se-sprite-conserned');

    setTimeout(thirdPhase, 1000);
  }, times[phase]);
};

const thirdPhase = () => {
  phase += 1;
  showSticker('Сёрфер злится');

  const image = chrome.extension.getURL('assets/images/serf-7-sad.png');
  sprite.style['background-image'] = `url('${image}')`;
  sprite.classList.add('__se-sprite-sad');
  sprite.classList.remove('__se-sprite-concerned-transition');

  /*
  const image = chrome.extension.getURL('assets/images/serf-8-sad-talk.png');
  sprite.style['background-image'] = `url('${image}')`;
  sprite.classList.add('__se-sprite-sad-talk');
  */

  setTimeout(() => {
    const image = chrome.extension.getURL('assets/images/serf-9-sad-transition.png');
    sprite.style['background-image'] = `url('${image}')`;
    sprite.classList.add('__se-sprite-sad-transition');
    sprite.classList.remove('__se-sprite-sad');

    setTimeout(forthPhase, 2000);
  }, times[phase]);
};

const forthPhase = () => {
  phase += 1;
  showSticker('Сёрфер стал акулой');

  const image = chrome.extension.getURL('assets/images/serf-10-shark.png');
  sprite.style['background-image'] = `url('${image}')`;
  sprite.classList.add('__se-sprite-shark');
  sprite.classList.remove('__se-sprite-sad-transition');
};

// start calculating scroll
window.addEventListener('scroll', onScroll, true);
// remove interval before unload
window.addEventListener('beforeunload', onUnload, true);

// create stickers and serfer
renderResources();

// start the phases
firstPhase();
