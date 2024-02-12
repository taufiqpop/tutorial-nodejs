const validator = require('validator');
// console.log(validator.isEmail('taufiqpop999@gmail.com'));
// console.log(validator.isMobilePhone('08123456789', 'id-ID'));
// console.log(validator.isNumeric('0812345678a9'));

const chalk = require('chalk');
console.log(chalk.italic.bgRed('Hello World!'));
const pesan = chalk`Keep Calm and {bgBlue.black.bold Chill}, but {bgGreen.italic.white Unstoppable}`;
console.log(pesan);