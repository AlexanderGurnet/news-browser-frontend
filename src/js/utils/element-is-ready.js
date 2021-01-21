const elementIsReady = (selector) => {
  return new Promise((resolve, reject) => {
    let element = document.querySelector(selector);
    if (element) {
      resolve(element);
    }
    new MutationObserver((mutationRecords, observer) => {
      Array.from(document.querySelectorAll(selector)).forEach((element) => {
        resolve(element);
        observer.disconnect();
      });
    })
      .observe(document.documentElement, {
        childList: true,
        subtree: true
      });
  });
};

export default elementIsReady;