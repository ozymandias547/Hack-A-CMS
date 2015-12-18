var clone = require('clone');
var _ = require('underscore');
var reducers = [];
var componentReducers = [];
var initialState = {};
var Moxi;
var deepcopy = require('deepcopy');

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
                    //var Component = _.findWhere(this.components, {name: part.name});

                    var Component = this.components[part.name];

                    if (typeof Component.reducer !== "undefined") {
                        componentReducers.push({ reducer: Component.reducer, uuid: part.uuid});
                    }

                }

            }.bind(this));

        }

    }

};

module.exports._addComponentReducer = function(componentName, uuid) {

    var Component = this.components[componentName];

    if (Component.reducer) {
        componentReducers.push({ reducer: Component.reducer, uuid: uuid});
    }

};

module.exports._addReducer = function(reducer) {
    reducers.push(reducer)
};

module.exports._rootReducer = function(state, action) {

    var now = Date.now();

    action.onAction = function(constant, cb) {

        var constants = constant.split(" ");

        constants.forEach(function(constant) {

            if(constant === action.type) {
                cb();
            }

        });

    };

    action.onActionFromThisComponent = function(constant, cb, props) {

        var constants = constant.split(" ");

        constants.forEach(function(constant) {

            if(constant === action.type && (constant === "@@redux/INIT" || constant === "changePage" )) {
                cb();
            }
            else if (typeof props !== "undefined") {
                if (constant === action.type && props.id === action.id) {
                    cb();
                }
            }

        });

    };

    var state = state || initialState;

    var newState = clone(state);

    reducers.forEach(function(reducer) {
        newState = _.extend(newState, reducer(newState, action));
    });

    componentReducers.forEach(function(reducer) {

        // TODO: Refactor for clarity

        if (action.type === "@@redux/INIT" || action.type === "changePage") {

            // Loop through each component scope and run init on them.

            var page = newState.pages[newState.currentUrl];

            for (var j in page.components) {
                var componentState = page.components[j];

                if (reducer.uuid === j) {

                    var contract = Moxi.components[componentState.componentName].contract;

                    if (contract) {

                        componentState.data = {};

                        for (var i in contract) {

                            action.pageData = {};
                            action.pageData[i] =  deepcopy(page.datasource[contract[i]]);


                            page.components[j] = _.extend(page.components[j], reducer.reducer(componentState, action));
                        }
                    } else {
                        page.components[j] = _.extend(page.components[j], reducer.reducer(componentState, action));
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

    var then = Date.now();

    var elapsed = then - now;
    console.log("\'%s\' reducers took %f ms",action.type, elapsed);

    return newState;

};

module.exports._setInitialState = function(_initialState) {
    initialState = _initialState;
    Moxi = this;
};

module.exports._pageReducer = function(state, action) {

    switch (action.type) {

        case "changePage":
            state.currentUrl = action.currentUrl;

            if (!state.pages[action.currentUrl]) {
                state.pages[action.currentUrl] = action.route
            }

            if (action.datasource) {
                state.pages[action.currentUrl] = _.extend({}, state.pages[action.currentUrl], {datasource: action.datasource});
            }
            break;
    }

    return state;
};