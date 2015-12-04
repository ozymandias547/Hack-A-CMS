var Router = require('director').Router;
var ReactDOM = require('react-dom');
var React = require('react');
var Redux = require('redux');
var Provider = require('react-redux').Provider;
var _ = require('underscore');
var adminEco = require('../../admin/admin');
var clone = require('clone');


module.exports._setupEcosystems = function() {

    // Admin ecosystem is preloaded in for all users.
    adminEco.register(this);
    adminEco.addRoutes(this);

    // TODO: Add a way to scan a users folder for index files of other ecosystems.
};

module.exports._setupStore = function() {

    var payload = window.__PAYLOAD__;

    var initialAppState = _.extend({
        currentUrl: payload.currentUrl,
        currentPage: payload.pages[payload.currentUrl],
        pages: payload.pages
    });

    for (var i in this.routes) {
        if (!initialAppState.pages[this.routes[i].url]) {
            initialAppState.pages[this.routes[i].url] = this.routes[i];
        }
    };

    this.appReducers = function() {

        var reducers = [];

        function addReducer(reducer) {
            reducers.push(reducer)
        }

        function rootReducer(state, action) {

            var state = state || initialAppState;

            var newState = clone(state);

            reducers.forEach(function(reducer) {
                newState = _.extend(newState, reducer(newState, action));
            });

            return newState;

        }

        return {
            rootReducer: rootReducer,
            addReducer: addReducer
        }

    }();

    this.appReducers.addReducer(function(state, action) {

        switch (action.type) {

            case "changePage":
                state.currentUrl = action.currentUrl;
                state.currentPage = state.pages[action.currentUrl];
                if (action.pageData) {
                    state.pages[action.currentUrl] = _.extend({}, state.pages[action.currentUrl], action.pageData);
                }
                break;
        }

        return state;
    });

    this.appStore = Redux.createStore(this.appReducers.rootReducer);


    for (var i in this.components) {
        if (this.components[i].reducer) {
            this.appReducers.addReducer(this.components[i].reducer);
        }
    }

}

module.exports._setupDOM = function() {

    this.router.init();

    var initialAppState = this.appStore.getState();

    ReactDOM.render(React.createElement(
        Provider,
        { store: this.appStore },
        React.createElement(this.layouts[initialAppState.pages[initialAppState.currentUrl].layout].component)
    ), document.getElementById("ROOT_CONTAINER"));

};
