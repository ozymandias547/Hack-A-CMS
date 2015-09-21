var Vivid = require('../../vivid/index.js');    // When vivid is an npm package, this will be require('vivid');
var myBlog = new Vivid();
var myBlogConfig;

if (process.env.VIVID_ENV) {
    myBlogConfig = require('./vivid.conf.js')[process.env.VIVID_ENV]
} else {
    myBlogConfig = require('./vivid.conf.js')["development"]
}

myBlog.initialize(myBlogConfig);

// Primary database stores site meta data and articles.
myBlog.setPrimaryDatabase({
    type: "mongo",
    host: "localhost",
    port: 27015,
    database: "test-site"
});

// Other data may come from an API, secondary database, a file on disk...
myBlog.dataPoint("api", {

});

myBlog.start();