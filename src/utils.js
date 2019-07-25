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

window.__se = window.__se || {};
window.__se.debounce = debounce;
