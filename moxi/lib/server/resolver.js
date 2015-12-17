
var _ = require('underscore');
var Promise = require('bluebird');
/*
 * resolveData: Server only
 *
 * The purpose of the resolveData routine is to combine a routes "resolve" object and the corresponding pre-register "datasource" object to retrieve the needed data for a route.  There are many ways data can be constructed, and this routing will gather them all in one place to provide a standard process.
 */

module.exports.resolveData = function(route, params) {

    for (var i in params) {
        var param = params[i];
        resolvedData[i] = param;
    }

    var promises = [];

    route.resolve.forEach(function (resolveItem) {

        var dataSource = this.datasources[resolveItem.datasource];
        var dataSourceDeps = {};

        for (var i in dataSource.deps) {

            var resolveItemDepFulfillment = resolveItem.dataSourceDeps[i];

            if (resolveItemDepFulfillment.type === "param") {
                dataSourceDeps[i] = params[resolveItem.dataSourceDeps[i].name]
            }
        }

        promises.push((function () {

            return new Promise(function (resolve, reject) {
                dataSource.server.middleware.call(this, dataSourceDeps, resolve, reject);
            }.bind(this))

        })())

    }.bind(this));

    return Promise.all(promises).then(function (data) {

        var finalPageData = {};

        data.forEach(function (bit, idx) {
            finalPageData[route.resolve[idx].datasource] = bit;
        });

        return finalPageData;

    });

};