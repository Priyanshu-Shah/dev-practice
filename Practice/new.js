// console.log('hi')

// __dirname  - path to current directory
// __filename - file name
// require    - function to use modules (CommonJS)
// module     - info about current module (file)
// process    - info about env where the program is being executed

//different file can act as module and we use module.exports{} and other modules can access 
//the arugemnets using require('./file-path'), we can also use moudle.exports = {} meaning passing as objects

/* Arrow representation of functions
const add = (n1,n2) => n1+n2;
const subtract = (n1,n2) => n1-n2;
module.exports = {add, subtract};

Now in other file we can use require('./math) for ex if module name is math.js, to access these functions
 */


