var React = require('react');
var Redux = require('redux');
var Provider = require('react-redux').Provider;
var _ = require('underscore');

module.exports.route = function(route) {

    var _this = this;

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