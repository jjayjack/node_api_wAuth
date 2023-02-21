// console.log(arguments);
// console.log(require('module').wrapper);

// module.exports
const ModuleOne = require('./test-module-1');

const calculatorOne = new ModuleOne();
console.log(calculatorOne.multiply(2, 5));

// exports
const ModuleTwo = require('./test-module-2');
console.log(ModuleTwo.multiply(2, 5));

//refactor to de-construct variables
const { add, multiply } = require('./test-module-2');
console.log(multiply(1, 4));

// caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
