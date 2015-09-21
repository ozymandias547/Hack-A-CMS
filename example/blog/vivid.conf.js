module.exports = {
    "common": {
        name: "My Blog Site",
        serverEntry: "myBlog-server-app.js",
        browserEntry: "myBlog-browser-app.js",
        distributable: "dist"
    },
    "dev": {
        "port": 3000
    },
    "prod": {
        "port": 8080
    }
};