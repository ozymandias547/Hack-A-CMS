var Router = require('director').Router;
var ReactDOM = require('react-dom');
var React = require('react');
var Redux = require('redux');
var Provider = require('react-redux').Provider;
var _ = require('underscore');
var adminEco = require('../../admin/index');

module.exports.start = function() {
    setupComponents.call(this);
    setupRoutes.call(this);
    setupAppStore.call(this);
    document.addEventListener('DOMContentLoaded', kickOffApp.bind(this), false);
};

function setupComponents() {
    adminEco.register(this);
}

function setupRoutes() {
    adminEco.addRoutes(this);
}

function setupAppStore() {

    var payload = window.__PAYLOAD__;

    var initialAppState = _.extend({
        currentUrl: payload.currentUrl,
        pages: payload.pages
    });

    for (var i in this.routes) {
        if (!initialAppState.pages[this.routes[i].url]) {
            initialAppState.pages[this.routes[i].url] = this.routes[i];
        }
    };

    this.appStore = Redux.createStore(function(state, action) {

        var state = state || initialAppState;

        switch (action.type) {
            case "changePage":
                var newState = _.extend({}, state, { currentUrl: action.currentUrl });
                _.extend(newState.pages[action.currentUrl], action.pageData);
                return newState;
                break;
            default : return state;
        }

        return state;

    });


}

function kickOffApp() {

    this.router.init();

    var initialAppState = this.appStore.getState();

    ReactDOM.render(React.createElement(
        Provider,
        { store: this.appStore },
        React.createElement(this.layouts[initialAppState.pages[initialAppState.currentUrl].layout].component)
    ), document.getElementById("ROOT_CONTAINER"));

}
