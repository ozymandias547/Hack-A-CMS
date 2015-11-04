module.exports = {
    "common": {
        mainDatabase: {
            type: "mongo",
            host: "localhost",
            port: 27015,
            database: "test-site"
        }
    },
    "dev": {
        "port": 3000
    },
    "prod": {
        "port": 8080
    }
};