module.exports.registerLayout = function(layout) {
	this.layouts[layout.name] = layout;
};

module.exports.registerComponent = function(component) {
    this.components[component.name] = component;
};