// TODO: Define and build out this method.
module.exports.resolveData = function(route) {

    var resolvedData = {};

    route.resolve.forEach(function(resolveItem) {

        if (resolveItem.datasource === "core/routes") {
            resolvedData["core/routes"] = this.routes;
        }

    }.bind(this));

    return resolvedData;

};