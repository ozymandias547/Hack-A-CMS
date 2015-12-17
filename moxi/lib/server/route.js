var React = require('react');
var Redux = require('redux');
var Provider = require('react-redux').Provider;
var ReactDOMServer = require('react-dom/server');
var _ = require('underscore');
var adminEco = require('../../admin/admin');
var uuid = require('uuid');
var clone = require('clone');

module.exports.route = function(route) {

    this.routes[route.name] = route;

    // Bind routes
    route.urls.forEach(function(url) {
        this.express.get(url, function RouteHandlerFunction(req, res) {

            if (this.mode === "dev") {
                adminEco.register(this);
            }

            var initialState = _.extend({
                currentUrl: req.url,
                pages: {}
            });



            if (!initialState.pages[req.url]) {

                if (!this.routes[route.name]) {
                    return res.send("not found! - Moxi CMS staff");
                }

                initialState.pages[req.url] = clone(this.routes[route.name]);
            }

            for (var j in initialState.pages[req.url].pageLayout) {
                var sections = initialState.pages[req.url].pageLayout[j];

                sections.forEach(function(section) {
                    section.uuid = uuid.v4();
                });
            }

            this.resolveData(route).then(function(datasource) {

                _.extend(initialState.pages[req.url], { datasource: datasource} );

                // Build initial component state
                for (var i in initialState.pages) {
                    var page = initialState.pages[i];

                    page.components = {};

                    for (var j in page.pageLayout) {
                        var content = page.pageLayout[j];

                        content.forEach(function (part) {
                            page.components[part.uuid] = {
                                componentName: part.name
                            };
                        }.bind(this))
                    }
                }


                this._setInitialState(initialState);
                this._addReducer(this._pageReducer);
                this._addHardCodedComponentReducers(initialState);
                this.appStore = Redux.createStore(this._rootReducer);

                var payload = this.appStore.getState();

                var appHtml = ReactDOMServer.renderToString(React.createElement(
                    Provider,
                    { store: this.appStore },
                    React.createElement(require('../App.jsx')(this), payload)
                ));

                res.send(
                    "<html>" +
                    "<head>" +
                    "<link rel='stylesheet' type='text/css' href='http://localhost:8882/moxiapp.css'></link>" +
                    "<script>var __PAYLOAD__ = " + JSON.stringify(payload) + "</script>" +
                    "</head>" +
                    "<body>" +
                    "<div id='ROOT_CONTAINER'>" + appHtml + "</div>" +
                    "<script src='http://localhost:8882/moxiapp/bundle.js'></script>" +
                    "</body>"

                );

            }.bind(this)).catch(function(error) {
                console.error(error);
            });

        }.bind(this))
    }.bind(this));

};

module.exports.removelRouteHandlers = function(route) {

    var routes = this.express._router.stack;

    route.urls.forEach(function(url) {
        routes.forEach(function(routeItem, i) {
            if (routeItem.route) {

                if (routeItem.route.path === url) {
                    routes.splice(i, 1);
                }
            }
        });
    });

};
