const randomMessages = Array.from({ length: 500 }, (_, i) => ({
    username: `user${Math.floor(Math.random() * 10) + 1}`,
    body: `This is message number ${i + 1}`
}));
console.log(randomMessages);

export default randomMessages;


function randomLengthString(minLength, maxLength) {
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const randomMessagesDetailed = Array.from({ length: 500 }, (_, i) => ({
    username: `user${Math.floor(Math.random() * 10) + 1}`,
    body: randomLengthString(20, 200)
}));

export { randomMessagesDetailed };