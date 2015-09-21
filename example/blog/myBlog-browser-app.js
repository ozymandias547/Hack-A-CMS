var Vivid = require('../../vivid/vivid-browser.js');    // This will eventually be the NPM module.
var myBlogSite = new Vivid();

myBlogSite.initialize(require('./vivid.conf.js'));

myBlogSite.start();