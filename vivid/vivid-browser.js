var _ = require('underscore');
var Router = require('director').Router;

function Vivid() {
    this.options = {};
    this.layouts = {};
    this.components = {};
    this.routes = {};
    this.mode = "dev";
    this.router = Router().configure({ html5history: true, run_handler_in_init: false });
}

_.extend(Vivid.prototype,
    require("./lib/browser/configure"),
    require("./lib/register"),
    require("./lib/layout"),
    require("./lib/resolver"),
    require("./lib/browser/route"),
    require("./lib/browser/start")
);

var vividSingleton = new Vivid();


module.exports = vividSingleton;