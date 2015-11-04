/*
    This file is compiled to browser code, and run on initial page request.
 */

var Vivid = require('../../../vivid/vivid-browser.js');    // require('vivid/browser'); (after npm module)
var myBlogSite = new Vivid();

myBlogSite.start();