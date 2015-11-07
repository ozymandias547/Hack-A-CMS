/*
    Run on browser when page loads.
 */
var component = require('./component/hello.jsx');

var Vivid = require('../../../vivid/vivid-browser.js');    // require('vivid/browser'); (after npm module)
var myBlogSite = new Vivid();

myBlogSite.start();