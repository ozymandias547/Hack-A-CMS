// TODO: Create method to run some code in server or browser mode only.

var isBrowser = typeof window === "undefined";
var isServer = !isBrowser;

module.exports.isBrowser = typeof window !== "undefined";

module.exports.runOnBrowser = function(cb) {
    if (this.isBrowser) {
        cb();
    }
}

module.exports.runOnServer = function(cb) {
    if (this.isServer) {
        cb();
    }
}