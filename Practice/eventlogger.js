const {format} = require('date-fns'); //Importing format function from date-fns module
const {v4 : uuid} = require('uuid'); 

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const { log } = require('util');

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`; //using string interpolation using template literals
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname, 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem);
    }
    catch(err){
        console.log(err);
    }
}

//Export the function
module.exports = {logEvents};
//note that the name of the function has to be same in other file when importing (agar multiple functions export kiye hai to immproting file ko kaise pata konsa hai)