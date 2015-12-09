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
        this.express.get(url, function(req, res) {

            if (this.mode === "dev") {
                adminEco.register(this);
            }

            var initialState = _.extend({
                currentUrl: req.url,
                pages: {}
            });

            // Build initial state of all known routes (hardcoded routes should be minimal, and most should come from the server)
            //for (var i in _this.routes) {
            //    var thisRoute = this.routes[req.url];

                route.urls.forEach(function(url) {

                    if (!initialState.pages[url]) {
                        initialState.pages[url] = clone(route);
                    }

                    for (var j in initialState.pages[url].pageLayout) {
                        var sections = initialState.pages[url].pageLayout[j];

                        sections.forEach(function(section) {
                            section.uuid = uuid.v4();
                        });
                    }

                });
            //}

            _.extend(initialState.pages[req.url], { datasource: this.resolveData(route)} );

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
                "<link rel='stylesheet' type='text/css' href='http://localhost:8882/vividapp.css'></link>" +
                "<script>var __PAYLOAD__ = " + JSON.stringify(payload) + "</script>" +
                "</head>" +
                "<body>" +
                "<div id='ROOT_CONTAINER'>" + appHtml + "</div>" +
                "<script src='http://localhost:8882/vividapp/bundle.js'></script>" +
                "</body>"

            );
        }.bind(this))
    }.bind(this));

};
