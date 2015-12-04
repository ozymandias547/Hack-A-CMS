var React = require('react');
var Redux = require('redux');
var Provider = require('react-redux').Provider;
var ReactDOMServer = require('react-dom/server');
var _ = require('underscore');
var adminEco = require('../../admin/admin');

module.exports.route = function(route) {

    var _this = this;
    this.routes[route.name] = route;

    this.express.get(route.url, function(req, res) {

        if (_this.mode === "dev") {
            adminEco.register(_this);
        }


        // ---Middleware---
        // auth filter
        // redirect filter
        // data gather

        // ---Render process---
        // create App HTML element
        // setup Redux Store
        // renderStore state
        // render App HTML element with payload

        var initialState = _.extend({
            currentUrl: req.url,
            pages: {}
        });

        // Build initial state of all known routes (hardcoded routes should be minimal, and most should come from the server)
        for (var i in _this.routes) {
            if (!initialState.pages[_this.routes[i].url]) {
                initialState.pages[_this.routes[i].url] = _this.routes[i];
            }
        };

        initialState.pages[req.url] = _.extend({}, route, _this.resolveData(route));

        initialState.currentPage = initialState.pages[initialState.currentUrl];

        for (var i in initialState.pages) {
            var page = initialState.pages[i];

            page.components = {};

            for (var j in page.pageLayout) {
                var content = page.pageLayout[j];

                content.forEach(function (part) {
                    page.components[part.uuid] = {};
                }.bind(this))
            }
        }

        var layout =_this.layouts[route.layout];

        //var store = configureStore(initialState);


        _this._setInitialState(initialState);
        _this._addReducer(_this._pageReducer);
        _this._addHardCodedComponentReducers(initialState);
        _this.appStore = Redux.createStore(_this._rootReducer);

        var payload = _this.appStore.getState();

        var appHtml = ReactDOMServer.renderToString(React.createElement(
            Provider,
            { store: _this.appStore },
            React.createElement(layout.component, payload)
        ));

        res.send(
            "<html>" +
            "<head>" +
                "<script>var __PAYLOAD__ = " + JSON.stringify(payload) + "</script>" +
                "<script src='http://localhost:8882/app1/bundle.js'></script>" +
            "</head>" +
            "<body>" +
                "<div id='ROOT_CONTAINER'>" + appHtml + "</div>" +
            "</body>"

        );

    });

};

function configureStore(initialState, action) {

    return Redux.createStore(function(state, actionType) {

        var state = state || initialState;

        switch (actionType) {
            default : return state;
        }

        return state;

    });

}