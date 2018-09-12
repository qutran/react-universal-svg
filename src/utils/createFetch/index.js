export default () => {
  const xhr = new XMLHttpRequest();

  const request = (url) => new Promise((resolve, reject) => {
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        resolve(xhr.response);
      } else {
        reject();
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  });

  return {
    fetch: request,
    abort: xhr.abort,
  };
};
