var Vivid = require('../../vivid/index.js');    // When vivid is an npm package, this will be require('vivid');
var myBlogSite = new Vivid();

myBlogSite.initialize({
    name : "",
    componentsDir: "./component",
    layoutDir: "./layout",
    skins: "./skin",
    logLevel: "debug",
    analytics: {
        ga: "GA-123456"
    },
    assets: "./asset"
});

myBlogSite.databaseSource({
    type: "mongo",
    host: "localhost",
    port: 27015,
    database: "test-site"
});

myBlogSite.start({

});