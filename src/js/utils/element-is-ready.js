const elementIsReady = (selector) => new Promise((resolve) => {
  const element = document.querySelector(selector);
  if (element) {
    resolve(element);
  }
  new MutationObserver((mutationRecords, observer) => {
    Array.from(document.querySelectorAll(selector)).forEach((elem) => {
      resolve(elem);
      observer.disconnect();
    });
  })
    .observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
});

export default elementIsReady;
