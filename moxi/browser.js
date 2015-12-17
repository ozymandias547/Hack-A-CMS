var _ = require('underscore');
var Router = require('director').Router;

function Moxi() {
    this.options = {};
    this.layouts = {};
    this.components = {};
    this.routes = {};
    this.datasources = {};
    this.mode = "dev";
    this.router = Router().configure({ html5history: true, run_handler_in_init: false, notfound: this.unknownRoute });
}

_.extend(Moxi.prototype,
    require("./lib/browser/configure"),
    require("./lib/register"),
    require("./lib/layout"),
    require("./lib/browser/resolver"),
    require("./lib/reducer"),
    require("./lib/browser/route"),
    require("./lib/browser/start")
);

var moxiSingleton = new Moxi();

window.Moxi = moxiSingleton;

module.exports = moxiSingleton;