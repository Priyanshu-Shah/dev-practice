const {format} = require('date-fns');
const {v4: uuid} = require('uuid');
console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));
console.log(uuid()); //This helps provide every entry to server a unique id
console.log(1); 


//in the package.json, we have provided multiple dependencies like date and uuid
//we used nodemon in scripts due to which we can use 'npm run dev' to start a server run
//meaning every time we save the code, the output is automatically printed
//For this we also had to provide nodemon with devDependency

//Inside dependency, eg: uuid : ^10.0.0 shows major version 10, minorversion 0, patch 0
//now ^ before that shows that the dependency can auto updat the minor version and the patch
//but not the major version (because it can potentially break the code)
//No ^ means only that particular version would work
//~ before the number would mean only allow patch update
//* means update everything everytime
//ofcourse npm update can be used to manually do that