export const disableError = function (callback, delay = 500) {
    callback('error');
    setTimeout(() => {
        callback('');
    }, delay);
}
