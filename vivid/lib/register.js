var uuid = require('uuid');

module.exports.registerLayout = function(layout) {
	this.layouts[layout.name] = layout;
};

//module.exports.registerComponent = function(component, reducer, contract) {
//
//    if (reducer) {
//        component.reducer = reducer;
//    }
//
//    if (reducer) {
//        component.contract = contract;
//    }
//
//
//
//    this.components[component.name] = component;
//};

module.exports.registerComponent = function(component) {
    this.components[component.name] = component.component;
};