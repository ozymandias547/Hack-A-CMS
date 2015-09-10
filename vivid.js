var vivid = require('./vivid/index.js');

vivid.init({
    site : "A test site",
    database : {
        type: "mongo",
        host: "localhost",
        port: 27015,
        database: "test-site"
    },
    session: {
        type: "mongoStore",
        host: "localhost",
        port: 27015,
        database: "test-site-session",
        cookieSecret: "hello"
    },
    componentsDir: "./component",
    layoutDir: "./layout",
    skins: "./skin",
    logLevel: "debug",
    analytics: {
        ga: "GA-123456"
    },
    assets: "./asset"
});

vivid.start();