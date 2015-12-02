var _ = require('underscore');

function Vivid() {
    this.options = {};
    this.layouts = {};
    this.components = {};
    this.mode = "dev";
}

_.extend(Vivid.prototype,
    require("./lib/browser/configure"),
    require("./lib/register"),
    require("./lib/layout"),
    require("./lib/browser/resolver"),
    require("./lib/browser/route"),
    require("./lib/browser/start")
);

var vividSingleton = new Vivid();

module.exports = vividSingleton;