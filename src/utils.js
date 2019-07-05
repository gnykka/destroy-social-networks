const debounce = (func, context, delay = 0) => {
  let timeout;

  return (...args) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(
      () => requestAnimationFrame(func.bind(context, ...args)),
      delay
    );
  };
};

const getWordEnding = (value) => {
  const lastDigit = value % 10;
  const lastTwoDigits = value % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) { return ''; }
  if (lastDigit  > 0 && lastDigit < 5 && (lastTwoDigits < 10 || lastTwoDigits > 14)) {
    return 'а';
  }
  return 'ов';
};

window.__se = { debounce, getWordEnding };