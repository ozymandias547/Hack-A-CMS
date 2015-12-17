var ReactDOM = require('react-dom');
var React = require('react');
var Redux = require('redux');
var Provider = require('react-redux').Provider;
var _ = require('underscore');
var clone = require('clone');
var uuid = require('uuid');

/*
 * route: loads a new route onto the router.
 *
 * @Param {Object}  A formal "Route" object
 * @Param {Object}  Optional page data that might come with the route object (such as if the route is unknown and the route call is bundled with the page data.
 */

module.exports.route = function(route, data) {

    // make a copy of the components in this route and bind them to the route object.

    this.routes[route.name] = route;

    route.urls.forEach(function(url) {

        this.router.on(url, function() {

            var params = Array.prototype.slice.call(arguments);

            params = params.map(function(param) {
                return decodeURIComponent(param);
            });

            this.resolveData(route, params).then(function(datasource) {

                var data = datasource;

                if (!this.appStore.getState().pages[url]) {
                    var newPage = _.clone(route);

                    newPage.components = {};

                    for (var j in newPage.pageLayout) {
                        var sections = newPage.pageLayout[j];

                        sections.forEach(function(section) {

                            section.uuid = uuid.v4();
                            newPage.components[section.uuid] = {
                                componentName: section.name
                            }

                            this._addComponentReducer(section.name, section.uuid);

                        }.bind(this));
                    }

                    this.appStore.dispatch({type: 'changePage', currentUrl : window.location.pathname, datasource: data, route: newPage});

                } else {
                    this.appStore.dispatch({type: 'changePage', currentUrl : window.location.pathname, datasource: data, route: route});
                }

            }.bind(this)).catch(function(error) {
                console.error(error);
            });

        }.bind(this));

    }.bind(this));


};

module.exports.unknownRoute = function() {
    console.log("couldn't find the route...");
};