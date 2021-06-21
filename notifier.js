const EventEmitter = require('events');
const FileWatcher = require('./filewatecher');

class Notifier extends EventEmitter {

    notifyUser = (path, name) => {

        const f = new FileWatcher(path);

        f.on('nameFoundOnFile', (fileName) => { 
            let message = `Your name was mentioned on file: ${fileName}!`;
            this.emit('openToastNotification', message);
            this.emit('printToConsole', message);
        });
        
        f.watchFile(name);

    }

}

module.exports = Notifier;