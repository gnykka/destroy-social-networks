let scroll = 0;
let prevScrollTop = 0;

let phase = 0;
const times = [10000, 10000, 10000, 10000]; // in ms

const stickerVisibleTime = 2000;
const toasterAnimationTime = 500;

// create container for stickers
const sticker = document.createElement('div');
sticker.className = '__se-sticker';
sticker.innerText = '';
document.body.appendChild(sticker);

// create serfer
const sprite = document.createElement('div');
const serfer = chrome.extension.getURL('assets/images/serf-1.png');
sprite.className = '__se-sprite';
sprite.style['background-image'] = `url('${serfer}')`;
document.body.appendChild(sprite);

const onScroll = debounce((event) => {
  const { scrollTop } = event.target.scrollingElement;

  scroll += Math.abs(scrollTop - prevScrollTop);
  prevScrollTop = scrollTop;
}, this);

const showSticker = (text) => {
  sticker.innerText = text;
  sticker.classList.add('visible');

  setTimeout(() => { sticker.classList.remove('visible'); }, stickerVisibleTime);
};

const firstPhase = () => {
  // nothing here except for simple animation
  setTimeout(secondPhase, times[phase]);
};

const secondPhase = () => {
  phase += 1;

  // show text for start of second phase
  showSticker('Закончилась первая фаза, начало второй фазы');

  // TODO: change serfer animation

  // go to third phase after some time
  setTimeout(thirdPhase, times[phase]);
};

const thirdPhase = () => {
  phase += 1;

  // show text for start of third phase
  showSticker('Закончилась вторая фаза, начало третьей фазы');

  // TODO: change serfer animation

  // go to forth phase after some time
  setTimeout(forthPhase, times[phase]);
};

const forthPhase = () => {
  phase += 1;

  // show text for start of forth phase
  showSticker('Закончилась третья фаза, начало четвёртой фазы');

  // TODO: change serfer animation

  // go to fifth phase after some time
  setTimeout(fifthPhase, times[phase]);
};

const fifthPhase = () => {
  phase += 1;

  // show text for start of forth phase
  showSticker('Закончилась последняя, четвёртая фаза');

  // toaster exits
  sprite.classList.add('hidden');
};

// start calculating scroll amount
window.addEventListener('scroll', onScroll, true);

// start the phases
firstPhase();
