/**
 * Функция, которая сначала вызывает переданный в нее колбэк с аргументом 'error', а затем,
 * через установленное задержку, вызывает его с пустой строкой. По умолчанию задержка составляет 500 мс.
 *
 * @example
 * disableError(callbackFunction)
 *
 * @param {Function} callback - функция обратного вызова, которую необходимо вызвать.
 * @param {number} [delay=500] - время задержки в миллисекундах между первым и вторым вызовом колбэка.
 */
export const disableError = function (callback, delay = 500) {
    callback('error');
    setTimeout(() => {
        callback('');
    }, delay);
}
