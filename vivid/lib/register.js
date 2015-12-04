module.exports.registerLayout = function(layout) {
	this.layouts[layout.name] = layout;
};

module.exports.registerComponent = function(component, reducer) {

    if (reducer) {
        component.reducer = reducer;
    }

    this.components[component.name] = component;
};