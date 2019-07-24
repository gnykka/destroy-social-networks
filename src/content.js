let index = -1;

const phases = [
  {
    time: 20000,
    image: 'assets/images/serf-1-happy.png',
    className: '__se-sprite-happy',
    talkImage: 'assets/images/serf-2-happy-talk.png',
    talkClassName: '__se-sprite-happy-talk',
    text: 'фаза 1',
    transitionImage: 'assets/images/serf-3-happy-transition.png',
    transitionClassName: '__se-sprite-happy-transition',
  }, {
    time: 40000,
    image: 'assets/images/serf-4-concerned.png',
    className: '__se-sprite-conserned',
    talkImage: 'assets/images/serf-5-concerned-talk.png',
    talkClassName: '__se-sprite-concerned-talk',
    text: 'фаза 2',
    transitionImage: 'assets/images/serf-6-concerned-transition.png',
    transitionClassName: '__se-sprite-conserned-transition',
  }, {
    time: 20000,
    image: 'assets/images/serf-7-sad.png',
    className: '__se-sprite-sad',
    talkImage: 'assets/images/serf-8-sad-talk.png',
    talkClassName: '__se-sprite-sad-talk',
    text: 'фаза 3',
    transitionImage: 'assets/images/serf-9-sad-transition.png',
    transitionClassName: '__se-sprite-sad-transition',
  }, {
    image: 'assets/images/serf-10-shark.png',
    className: '__se-sprite-shark',
  }
];

const talkTime = 4000;

const storageUpdateTime = 5000;
const stickerVisibleTime = 5000;

let sticker, sprite;

// get scroll and time values
let scroll, fullScroll;
let time, fullTime;
let lastDate;
let now = new Date();
let prevScrollTop = 0;

chrome.storage.sync.get(['scroll', 'fullScroll', 'time', 'fullTime', 'lastDate'], (items) => {
  scroll = items.scroll || 0;
  fullScroll = items.fullScroll || 0;
  time = items.time || 0;
  fullTime = items.fullTime || 0;
  lastDate = items.lastDate
    ? new Date(items.lastDate)
    : new Date(now.getFullYear(), now.getMonth(), now.getDate());
});

// write new values to storage
const storageTimer = setInterval(() => {
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

  console.log(scroll, fullScroll, time, fullTime, lastDate);

  chrome.storage.sync.set({
    scroll, fullScroll,
    time, fullTime,
    lastDate: lastDate.getTime(),
  });
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
};

const phasesCycle = () => {
  index += 1;

  const currentIndex = index;
  const phase = phases[index];

  setImage(
    phase.image,
    phase.className,
    index > 0 ? phases[index - 1].transitionClassName : null,
  );

  if (!phase.time) {
    return;
  }

  const interval = setInterval(() => {
    if (index > currentIndex) {
      clearInterval(interval);
      return;
    }

    setImage(phase.talkImage, phase.talkClassName, phase.className);
    showSticker(phase.text);

    setTimeout(() => {
      if (index > currentIndex) {
        clearInterval(interval);
        return;
      }

      setImage(phase.image, phase.className, phase.talkClassName);
    }, stickerVisibleTime);
  }, talkTime + stickerVisibleTime);

  setTimeout(() => {
    clearInterval(interval);

    setImage(phase.transitionImage, phase.transitionClassName, phase.className);

    setTimeout(phasesCycle, 1000);
  }, phase.time);
};

// start calculating scroll
window.addEventListener('scroll', onScroll, true);
// remove interval before unload
window.addEventListener('beforeunload', onUnload, true);

// create stickers and serfer
renderResources();

// start the phases
phasesCycle();
