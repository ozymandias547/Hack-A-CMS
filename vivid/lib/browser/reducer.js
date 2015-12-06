var clone = require('clone');
var _ = require('underscore');

var reducers = [];
var componentReducers = [];
var initialState = {};

module.exports._addHardCodedComponentReducers = function(initialState) {

    // TODO: Reanalyze and refactor for clarity

    var payload;

    if (typeof window !== "undefined") {
        payload = window.__PAYLOAD__;
    } else {
        payload = initialState;
    }

    for (var i in payload.pages) {
        var page = payload.pages[i]

        for (var j in page.pageLayout) {
            var content = page.pageLayout[j];

            content.forEach(function(part) {

                if (part.type === "component") {

                    // instantiate a new reducer from the component
                    var Component = _.findWhere(this.components, {name: part.name});

                    if (Component.reducer) {
                        componentReducers.push({ reducer: Component.reducer(), uuid: part.uuid});
                    }

                }

            }.bind(this));

        }

    }

};

module.exports._addReducer = function(reducer) {
    reducers.push(reducer)
};

module.exports._rootReducer = function(state, action) {

    var state = state || initialState;

    var newState = clone(state);

    reducers.forEach(function(reducer) {
        newState = _.extend(newState, reducer(newState, action));
    });

    componentReducers.forEach(function(reducer) {

        // TODO: Refactor for clarity

        if (action.type === "@@redux/INIT") {

            // Loop through each component scope and run init on them.

            for (var i in  newState.pages) {
                var page = newState.pages[i];

                for (var j in page.components) {
                    var component = page.components[j];

                    if (reducer.uuid === j) {
                        newState = _.extend(newState, reducer.reducer(component, action));
                    }
                }
            }

        } else {

            var componentScope = newState.pages[newState.currentUrl].components[reducer.uuid];

            if (componentScope) {

                if (action.sendToAllComponentsOnPage) {
                    newState = _.extend(newState, reducer.reducer(componentScope, action))
                }
                else if (action.sendToAllComponentsOfThistype) {
                    newState = _.extend(newState, reducer.reducer(componentScope, action))
                }
                else if (reducer.uuid === action.componentId) {
                    newState = _.extend(newState, reducer.reducer(componentScope, action))
                }
            }

        }

    });

    return newState;

};

module.exports._setInitialState = function(_initialState) {
    initialState = _initialState;
};

module.exports._pageReducer = function(state, action) {

    switch (action.type) {

        case "changePage":
            state.currentUrl = action.currentUrl;
            if (action.pageData) {
                state.pages[action.currentUrl] = _.extend({}, state.pages[action.currentUrl], action.pageData);
            }
            break;
    }

    return state;
};