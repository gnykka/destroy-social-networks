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

// creater toaster
const sprite = document.createElement('div');
const toaster = chrome.extension.getURL('assets/images/toaster.png');
sprite.className = '__se-sprite';
sprite.style['background-image'] = `url('${toaster}')`;
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

  // toaster starts to jump a little
  // calculate full jumps time and stop animation after it
  const jumpsCount = Math.floor(times[phase] / toasterAnimationTime);
  const jumpStep = (jump) => {
    const top = (jump % 2 === 0 ? -20 : 0);
    sprite.style.transform = `translateY(${top}px)`;

    if (jump < jumpsCount * 2 - 1) {
      setTimeout(() => { jumpStep(jump + 1); }, toasterAnimationTime / 2);
    }
  };
  jumpStep(0);

  // go to third phase after some time
  setTimeout(thirdPhase, times[phase]);
};

const thirdPhase = () => {
  phase += 1;

  // show text for start of third phase
  showSticker('Закончилась вторая фаза, начало третьей фазы');

  // toaster jumps higher
  const jumpsCount = Math.floor(times[phase] / toasterAnimationTime);
  const jumpStep = (jump) => {
    const top = (jump % 2 === 0 ? -60 : 0);
    sprite.style.transform = `translateY(${top}px)`;

    if (jump < jumpsCount * 2 - 1) {
      setTimeout(() => { jumpStep(jump + 1); }, toasterAnimationTime / 2);
    }
  };
  jumpStep(0);

  // go to forth phase after some time
  setTimeout(forthPhase, times[phase]);
};

const forthPhase = () => {
  phase += 1;

  // show text for start of forth phase
  showSticker('Закончилась третья фаза, начало четвёртой фазы');

  // toaster shifts
  const shiftsCount = Math.floor(times[phase] / toasterAnimationTime);
  const shiftStep = (shift) => {
    const left = (shift % 2 === 0 ? 50 : 0);
    sprite.style.transform = `translateX(${left}px)`;

    if (shift < shiftsCount * 2 - 1) {
      setTimeout(() => { shiftStep(shift + 1); }, toasterAnimationTime / 2);
    }
  };
  shiftStep(0);

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
