var Moxi = require('../../../moxi/browser.js');

var envs = {
    dev: {
        mode: "dev"
    }
};

Moxi.configure(envs["dev"]);
Moxi.start();

