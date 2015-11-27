var Vivid = require('../../../vivid/index.js');    // When vivid is an npm package, this will be require('vivid');

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

Vivid.configure(envs["dev"]);
Vivid.start();



