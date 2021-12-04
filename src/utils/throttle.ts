export const throttle = <T extends (...args: any[]) => unknown>(
  callback: T,
  delay = 100
) => {
  let waiting = false;
  return function () {
    if (!waiting) {
      callback();
      waiting = true;
      setTimeout(function () {
        waiting = false;
      }, delay);
    }
  };
};
