module.exports.resolveData = function(route) {

    var resolvedData = {};

    route.resolve.forEach(function(resolveItem) {

        if (resolveItem.datasource === "core/routes") {
            resolvedData["core/routes"] = this.routes;
        }

        console.log(resolveItem);
    }.bind(this));

    return resolvedData;

    // Fulfills contracts that components have to receive data from a datasource.
    //if (route.url === "/") {
    //    return {
    //        meta: {
    //            title: "Vivid Routes"
    //        }
    //    };
    //}
    //
    //if (route.url === "/config") {
    //    return {
    //        meta: {
    //            title: "Vivid Configuration"
    //        }
    //    };
    //}
    //
    //if (route.url === "/users") {
    //    return {
    //        meta: {
    //            title: "Users"
    //        }
    //    };
    //}

};