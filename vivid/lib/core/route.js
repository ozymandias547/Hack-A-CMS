var debug = require('debug')('vivid:core:addpage');
var React = require('react');
var ReactDOMServer = require('react-dom/server');

var _routes = [];

module.exports.addRoute = function(route) {
    this._express.get(route.url, function(req, res) {
        res.send(ReactDOMServer.renderToString(React.createElement(route.page, route.data)));
    });
};

module.exports.addPageLayout = function(pageLayout) {
	this._pageLayouts[pageLayout.name] = pageLayout;
};

module.exports.addLayout = function(name, layoutComponent) {
	this._layouts[name] = layoutComponent;
};