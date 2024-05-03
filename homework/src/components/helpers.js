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

/**
 * Функция для преобразования текста на кириллице в латиницу.
 *
 * @name cyrillicToLatin
 * @function
 * @exports
 *
 * @param {string} text - Строка на кириллице, которую необходимо преобразовать.
 *
 * @returns {string} Строка на латинице, являющаяся преобразованием исходной строки.
 *
 * @example
 * const cyrillicText = "Привет, мир!";
 * console.log(cyrillicToLatin(cyrillicText));  // "Privet, mir!"
 *
 */
export function cyrillicToLatin(text) {
    const cyrillic = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'];
    const latin = ['a', 'b', 'v', 'g', 'd', 'e', 'e', 'zh', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h', 'ts', 'ch', 'sh', 'shch', 'i', 'y', 'e', 'yu', 'ya'];

    function convertToLatin(char) {
        const lowerChar = char.toLowerCase();
        const index = cyrillic.indexOf(lowerChar);

        if (index !== -1) {
            return char === lowerChar
                ? latin[index]
                : latin[index].toUpperCase();
        }

        return char;
    }

    return text
        .split('')
        .map(convertToLatin)
        .join('');
}