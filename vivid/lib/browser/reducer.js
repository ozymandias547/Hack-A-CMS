var clone = require('clone');
var _ = require('underscore');

var reducers = [];
var componentReducers = [];
var initialState = {};

module.exports._addHardCodedComponentReducers = function() {

    for (var i in this.appStore.getState().pages) {
        var page = this.appStore.getState().pages[i]

        for (var j in page.pageLayout) {
            var content = page.pageLayout[j];

            content.forEach(function(part) {

                if (part.type === "component") {

                    // instantiate a new reducer from the component
                    var Component = _.findWhere(this.components, {name: part.name});

                    if (Component.reducer) {
                        console.log("add reducer");
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

        var componentScope = newState.pages[newState.currentUrl].components[reducer.uuid];

        if (action.sendToAllComponentsOfThistype) {
            newState = _.extend(newState, reducer.reducer( componentScope, action ))
        }
        else if (reducer.uuid === action.component) {
            if (componentScope) {
                newState = _.extend(newState, reducer.reducer( componentScope, action ))
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
            state.currentPage = state.pages[action.currentUrl];
            if (action.pageData) {
                state.pages[action.currentUrl] = _.extend({}, state.pages[action.currentUrl], action.pageData);
            }
            break;
    }

    return state;
};