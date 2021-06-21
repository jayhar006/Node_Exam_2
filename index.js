const fs = require('fs');
const yargs = require("yargs");
const nodeNotifier = require('node-notifier');
const Notifier = require('./notifier');

let args = yargs.argv;

if (args.name && args.path) {

    const path = args.path;

    fs.access(path, fs.constants.F_OK, (err) => {

        if (err) {
            console.error(`${path} does not exist.`); 
        } else {
            
            console.log(`Watching path: ${path}`);
            const notifier = new Notifier();

            notifier.on('openToastNotification', (message) => {
                nodeNotifier.notify({
                    title: 'File Watcher', 
                    message
                });
            });

            notifier.on('printToConsole', (message) => {
                console.log(message);
            });

            notifier.notifyUser(path, args.name);

        }

    });




} else {
    console.error('Please input name and path. To listen...');
}