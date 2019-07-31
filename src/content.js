let phaseIndex = -1;
let phaseTimes = [];

const talkTime = 3 * 60 * 1000; // 3 minutes
const storageUpdateTime = 5000;
const stickerVisibleTime = 6000;

let sticker, sprite;
let stickerTimeout;

// get scroll and time values
let scroll, fullScroll;
let time, fullTime;
let lastDate;
let now = new Date();
let prevScrollTop = 0;

chrome.storage.sync.get(['scroll', 'fullScroll', 'time', 'fullTime', 'lastDate', 'timeLimit'], (items) => {
  scroll = items.scroll || 0;
  fullScroll = items.fullScroll || 0;
  time = items.time || 0;
  fullTime = items.fullTime || 0;
  lastDate = items.lastDate
    ? new Date(items.lastDate)
    : new Date(now.getFullYear(), now.getMonth(), now.getDate());

  saveData();

  const limit = (items.timeLimit || 15) * 60 * 1000;
  phaseTimes = [limit * 0.25, limit * 0.5, limit * 0.25];

  if (time < phaseTimes[0]) {
    phaseIndex = -1;
    phaseTimes[0] -= time;
  } else if (time < phaseTimes[0] + phaseTimes[1]) {
    phaseIndex = 0;
    phaseTimes[1] -= (time - phaseTimes[0]);
  } else if (time < phaseTimes[0] + phaseTimes[1] + phaseTimes[2]) {
    phaseIndex = 1;
    phaseTimes[2] -= (time - phaseTimes[0] - phaseTimes[1]);
  } else {
    phaseIndex = 2;
  }

  // create stickers and serfer
  renderResources();
  // start the phases
  phasesCycle();
  //say hello
  talk(initText);
});

// write new values to storage
const saveData = () => {
  const current = now.getTime();

  now = new Date();

  const delta = now.getTime() - current;

  time += delta;
  fullTime += delta;

  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (date > lastDate) {
    scroll = 0;
    time = 0;
    lastDate = date;
  }

  chrome.storage.sync.set({
    scroll, fullScroll,
    time, fullTime,
    lastDate: lastDate.getTime(),
  });
};
const storageTimer = setInterval(saveData, storageUpdateTime);

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

  sprite.addEventListener('click', () => {
    talk(texts[phaseIndex][Math.round(Math.random() * (texts[phaseIndex].length - 1))]);
  });
}

const showSticker = (text) => {
  sticker.innerText = text;
  sticker.classList.add('visible');

  clearTimeout(stickerTimeout);
  stickerTimeout = setTimeout(() => {
    sticker.classList.remove('visible');
  }, stickerVisibleTime);
};

const setImage = (url, className, oldClassName) => {
  const image = chrome.extension.getURL(url);

  sprite.style['background-image'] = `url('${image}')`;
  sprite.classList.add(className);

  if (oldClassName) {
    sprite.classList.remove(oldClassName);
  }
};

const talk = (text) => {
  const phase = phases[phaseIndex];

  setImage(phase.talkImage, phase.talkClassName, phase.className);
  showSticker(text);

  setTimeout(() => {
    setImage(phase.image, phase.className, phase.talkClassName);
  }, stickerVisibleTime);
};

const phasesCycle = () => {
  phaseIndex += 1;

  const currentIndex = phaseIndex;
  const phase = phases[phaseIndex];

  setImage(
    phase.image,
    phase.className,
    phaseIndex > 0 ? phases[phaseIndex - 1].transitionClassName : null,
  );

  if (phaseIndex === phaseTimes.length) {
    showSticker(texts[phaseIndex][Math.round(Math.random() * (texts[phaseIndex].length - 1))]);
    return;
  }

  const interval = setInterval(() => {
    if (phaseIndex > currentIndex) {
      clearInterval(interval);
      return;
    }

    setImage(phase.talkImage, phase.talkClassName, phase.className);
    showSticker(texts[phaseIndex][Math.round(Math.random() * (texts[phaseIndex].length - 1))]);

    setTimeout(() => {
      if (phaseIndex > currentIndex) {
        clearInterval(interval);
        return;
      }

      setImage(phase.image, phase.className, phase.talkClassName);
    }, stickerVisibleTime);
  }, talkTime);

  setTimeout(() => {
    clearInterval(interval);

    setImage(phase.transitionImage, phase.transitionClassName, phase.className);

    setTimeout(phasesCycle, 1000);
  }, phaseTimes[phaseIndex]);
};

// start calculating scroll
window.addEventListener('scroll', onScroll, true);
// remove interval before unload
window.addEventListener('beforeunload', onUnload, true);
