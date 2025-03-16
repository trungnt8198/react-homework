const debounce = (func, delay) => {
  let timeOut;

  return (...args) => {
    if (timeOut) {
      clearTimeout(timeOut);
    }

    timeOut = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default debounce;
