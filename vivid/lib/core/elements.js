var debug = require('debug')('vivid:core:addpage');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var adminEco = require('../../admin');

module.exports.addRoute = function(route) {

    var _this = this;

    this._express.get(route.url, function(req, res) {

        if (_this._mode === "dev") {
            adminEco.register(_this);
        }


        var layout =_this._layouts[route.layout];
        res.send(ReactDOMServer.renderToString(React.createElement(layout.component, route)));
    });

};

module.exports.addLayout = function(layout) {
	this._layouts[layout.name] = layout;
};

module.exports.addComponent = function(component) {
    this._components[component.name] = component;
}