var React = require('react');
var ReactDOMServer = require('react-dom/server');
var _ = require('underscore');
var adminEco = require('../../admin');

module.exports.route = function(route) {

    var _this = this;

    this.express.get(route.url, function(req, res) {

        if (_this.mode === "dev") {
            adminEco.register(_this);
        }


        // ---Middleware---
        // auth filter
        // redirect filter
        // data gather
        // prepare payload

        // ---Render process---
        // create App HTML element
        // setup Redux Store
        // renderStore state
        // render App HTML element

        var layout =_this.layouts[route.layout];
        res.send(ReactDOMServer.renderToString(React.createElement(layout.component, _.extend({}, route, _this.resolveData(route.resolve)))));

    });

};

