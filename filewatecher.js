const EventEmtter = require('events');
const path = require('path');
const fs = require('fs');

class FileWatcher extends EventEmtter {

    constructor (path) {
        super();
        this.path = path;
    }

    watchFile = (name) => {
        
        fs.watch(this.path, {  recursive : true }, (eventType, fileName) => {

            let updatedFile = path.join(this.path, fileName);
            let isFileFound = fs.existsSync(updatedFile) && fs.lstatSync(updatedFile).isFile();

            if (isFileFound) {
                fs.readFile(updatedFile, 'utf-8', (err, data) => {

                    let searchStr = new String(name).toUpperCase();
                    let fileContents = new String(data).toUpperCase();
                    let isNameFound = new RegExp("\\b" + searchStr + "\\b").test(fileContents);
                    
                    if (isNameFound) {
                        this.emit('nameFoundOnFile', fileName);
                    } 

                });  
            }
        });

    }

}

module.exports = FileWatcher;