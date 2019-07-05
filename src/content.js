const pxToM = 0.000264;
const width = window.innerWidth;
const height = window.innerHeight;
const spriteSize = 64;
const toaster = chrome.extension.getURL('assets/toaster.png');

let scroll = 0;
let prevScrollTop = 0;

const scrollInfo = document.createElement('div');
scrollInfo.className = '__se-container';
scrollInfo.innerText = '0 см';
document.body.appendChild(scrollInfo);

const createSprite = () => {
  const sprite = document.createElement('div');

  sprite.className = '__se-sprite';
  sprite.style['background-image'] = `url('${toaster}')`;
  sprite.style.left = `${width}px`;
  sprite.style.transform = 'translateX(0)';
  sprite.style.top = `${Math.random() * (height - spriteSize)}px`;

  document.body.appendChild(sprite);

  let left = 0;
  const speed = Math.random() * 10 + 1;

  const flyStep = () => {
    left -= speed;
    sprite.style.transform = `translateX(${left}px)`;

    if (left >= -width) {
      requestAnimationFrame(flyStep);
    } else {
      document.body.removeChild(sprite);
    }
  };
  requestAnimationFrame(flyStep);
};

setInterval(() => {
  createSprite();
}, 3000);

const onScroll = debounce((event) => {
  const { scrollTop } = event.target.scrollingElement;

  scroll += Math.abs(scrollTop - prevScrollTop);
  prevScrollTop = scrollTop;

  const m = scroll * pxToM;
  const fullM = Math.floor(m);
  const sm = Math.floor((m - fullM) * 100);

  let str = '';
  if (fullM > 0) {
    str += `${fullM} м`;
  }
  if (fullM > 0 && sm > 0) {
    str += ' ';
  }
  if (sm > 0 || str === '') {
    str += `${sm} см`;
  }

  scrollInfo.innerHTML = str;
}, this);

window.addEventListener('scroll', onScroll, true);
