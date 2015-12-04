var ReactDOM = require('react-dom');
var React = require('react');
var Redux = require('redux');
var Provider = require('react-redux').Provider;
var _ = require('underscore');

/*
 * route: loads a new route onto the router.
 *
 * @Param {Object}  A formal "Route" object
 * @Param {Object}  Optional page data that might come with the route object (such as if the route is unknown and the route call is bundled with the page data.
 */

module.exports.route = function(route, data) {

    // make a copy of the components in this route and bind them to the route object.

    this.routes[route.name] = route;

    this.router.on(route.url, function() {

        // Render pipeline

        //Retrieve data if not supplied (this will be async)
        var data = typeof data !== "undefined" ? data : this.resolveData(route);

        // Send a dispatch which rerenders the page based upon the page data.
        this.appStore.dispatch({type: 'changePage', currentUrl : window.location.pathname, pageData: data, route: route});

    }.bind(this));

};