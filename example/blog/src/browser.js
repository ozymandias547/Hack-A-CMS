var Vivid = require('../../../vivid/vivid-browser.js');

var envs = {
    dev: {
        mode: "dev"
    }
};

Vivid.configure(envs["dev"]);
Vivid.start();

