var React = require('react');
var Redux = require('redux');
var Provider = require('react-redux').Provider;
var ReactDOMServer = require('react-dom/server');
var _ = require('underscore');
var adminEco = require('../../admin/admin');

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

        // ---Render process---
        // create App HTML element
        // setup Redux Store
        // renderStore state
        // render App HTML element with payload

        var initialState = _.extend({
            currentUrl: req.url,
            pages: {}
        });

        initialState.pages[req.url] = _.extend({}, route, _this.resolveData(route));

        initialState.currentPage = initialState.pages[initialState.currentUrl];

        var layout =_this.layouts[route.layout];

        var store = configureStore(initialState);
        var payload = store.getState();

        var appHtml = ReactDOMServer.renderToString(React.createElement(
            Provider,
            { store: store },
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