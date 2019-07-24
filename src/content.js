let phase = 0;
const times = [20000, 40000, 20000]; // in ms

const talkTime = 4000;

// 1 фаза — улыбающийся серфер (25%)
// 2 фаза — хмурый серфер (50%)
// 3 фаза — злой серфер (25%)

const storageUpdateTime = 5000;
const stickerVisibleTime = 5000;

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

  setTimeout(() => {
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
}

const firstPhase = () => {
  setImage(
    'assets/images/serf-1-happy.png',
    '__se-sprite-happy',
  );

  const interval = setInterval(() => {
    if (phase > 0) {
      clearInterval(interval);
      return;
    }

    setImage(
      'assets/images/serf-2-happy-talk.png',
      '__se-sprite-happy-talk',
      '__se-sprite-happy',
    );

    showSticker('Сёрфер радостный');

    setTimeout(() => {
      if (phase > 0) {
        clearInterval(interval);
        return;
      }

      setImage(
        'assets/images/serf-1-happy.png',
        '__se-sprite-happy',
        '__se-sprite-happy-talk',
      );
    }, stickerVisibleTime);
  }, talkTime + stickerVisibleTime);

  setTimeout(() => {
    clearInterval(interval);

    setImage(
      'assets/images/serf-3-happy-transition.png',
      '__se-sprite-happy-transition',
      '__se-sprite-happy',
    );

    setTimeout(secondPhase, 1000);
  }, times[phase]);
};

const secondPhase = () => {
  phase += 1;

  setImage(
    'assets/images/serf-4-concerned.png',
    '__se-sprite-conserned',
    '__se-sprite-happy-transition',
  );

  const interval = setInterval(() => {
    if (phase > 1) {
      clearInterval(interval);
      return;
    }

    setImage(
      'assets/images/serf-5-concerned-talk.png',
      '__se-sprite-concerned-talk',
      '__se-sprite-conserned',
    );

    showSticker('Сёрфер растроен');

    setTimeout(() => {
      if (phase > 1) {
        clearInterval(interval);
        return;
      }

      setImage(
        'assets/images/serf-4-concerned.png',
        '__se-sprite-conserned',
        '__se-sprite-concerned-talk',
      );
    }, stickerVisibleTime);
  }, talkTime + stickerVisibleTime);

  setTimeout(() => {
    clearInterval(interval);

    setImage(
      'assets/images/serf-6-concerned-transition.png',
      '__se-sprite-conserned-transition',
      '__se-sprite-conserned',
    );

    setTimeout(thirdPhase, 1000);
  }, times[phase]);
};

const thirdPhase = () => {
  phase += 1;

  setImage(
    'assets/images/serf-7-sad.png',
    '__se-sprite-sad',
    '__se-sprite-conserned-transition',
  );

  const interval = setInterval(() => {
    if (phase > 2) {
      clearInterval(interval);
      return;
    }

    setImage(
      'assets/images/serf-8-sad-talk.png',
      '__se-sprite-sad-talk',
      '__se-sprite-sad',
    );

    showSticker('Сёрфер злится');

    setTimeout(() => {
      if (phase > 2) {
        clearInterval(interval);
        return;
      }

      setImage(
        'assets/images/serf-7-sad.png',
        '__se-sprite-sad',
        '__se-sprite-sad-talk',
      );
    }, stickerVisibleTime);
  }, talkTime + stickerVisibleTime);

  setTimeout(() => {
    clearInterval(interval);

    setImage(
      'assets/images/serf-9-sad-transition.png',
      '__se-sprite-sad-transition',
      '__se-sprite-sad',
    );

    setTimeout(forthPhase, 2000);
  }, times[phase]);
};

const forthPhase = () => {
  phase += 1;

  setImage(
    'assets/images/serf-10-shark.png',
    '__se-sprite-shark',
    '__se-sprite-sad-transition',
  );
};

// start calculating scroll
window.addEventListener('scroll', onScroll, true);
// remove interval before unload
window.addEventListener('beforeunload', onUnload, true);

// create stickers and serfer
renderResources();

// start the phases
firstPhase();
