var Moxi = require('../../../moxi/index.js');    // When vivid is an npm package, this will be require('vivid');

var envs = {
    dev: {
        port: 8000,
        mode: "dev",
        db: {
            type: "mongo",
            path: "localhost:27017"
        }
    }
};

Moxi.configure(envs["dev"]);
Moxi.start();



