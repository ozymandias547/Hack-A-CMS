var ReactDOM = require('react-dom');
var React = require('react');
var Redux = require('redux');
var Provider = require('react-redux').Provider;
var _ = require('underscore');

module.exports.route = function(route) {

    var _this = this;
    var hasLoadedData = false;


    this.routes[route.name] = route;

    this.router.on(route.url, function() {

        // Browser Render pipeline

        if (!hasLoadedData) {
            var pageData = _this.resolveData(route);
            _this.appStore.dispatch({type: 'changePage', currentUrl : window.location.pathname, pageData: pageData});
            hasLoadedData = true;
        } else {
            _this.appStore.dispatch({type: 'changePage', currentUrl : window.location.pathname});
        }

    });

};