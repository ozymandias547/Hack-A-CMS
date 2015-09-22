var Vivid = require('../../vivid/index.js');    // When vivid is an npm package, this will be require('vivid');
var myBlog = new Vivid();

myBlog.init('./vivid.conf.js');
myBlog.start();