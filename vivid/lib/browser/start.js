var Router = require('director').Router;
var ReactDOM = require('react-dom');
var React = require('react');
var Redux = require('redux');
var Provider = require('react-redux').Provider;
var _ = require('underscore');
var adminEco = require('../../admin/admin');


module.exports.start = function() {

    // bootup subsytems
    this._startEcosystems();
    this._startStore();

    // bind to dom
    document.addEventListener('DOMContentLoaded', this._startDOM.bind(this), false);

};

module.exports._startEcosystems = function() {

    // Admin ecosystem is preloaded in for all users.
    adminEco.register(this);
    adminEco.addRoutes(this);

    // TODO: Add a way to scan a users folder for index files of other ecosystems.
};

module.exports._startStore = function() {

    var payload = window.__PAYLOAD__;

    var initialAppState = _.extend({
        currentUrl: payload.currentUrl,
        currentPage: payload.pages[payload.currentUrl],
        pages: payload.pages
    });

    // Build initial state of all known routes (hardcoded routes should be minimal, and most should come from the server)
    for (var i in this.routes) {
        if (!initialAppState.pages[this.routes[i].url]) {
            initialAppState.pages[this.routes[i].url] = this.routes[i];
        }
    };

    for (var i in initialAppState.pages) {
        var page = initialAppState.pages[i];

        page.components = {};

        for (var j in page.pageLayout) {
            var content = page.pageLayout[j];

            content.forEach(function (part) {
                page.components[part.uuid] = {};
            }.bind(this))
        }
    }

    // Setup up root, page, and component reducers
    this._setInitialState(initialAppState);
    this._addReducer(this._pageReducer);
    this._addHardCodedComponentReducers();
    this.appStore = Redux.createStore(this._rootReducer);

};

module.exports._startDOM = function() {

    this.router.init();

    var initialAppState = this.appStore.getState();

    ReactDOM.render(React.createElement(
        Provider,
        { store: this.appStore },
        React.createElement(this.layouts[initialAppState.pages[initialAppState.currentUrl].layout].component)
    ), document.getElementById("ROOT_CONTAINER"));

};
