var q = require('q');

module.exports.resolveData = function(route, params) {

    var promises = [];

    route.resolve.forEach(function(resolveItem) {

        var dataSource = this.datasources[resolveItem.datasource];
        var dataSourceDeps = {};

        promises.push((function() {

            var deferred = q.defer();
            var paramIndex = 0;

            for (var i in dataSource.deps) {

                var resolveItemDepFulfillment = resolveItem.dataSourceDeps[i];

                if (resolveItemDepFulfillment.type === "param") {
                    dataSourceDeps[i] = params[paramIndex]
                    paramIndex++;
                }
            }

            dataSource.browser.middleware(dataSourceDeps, deferred.resolve);

            return deferred.promise;
        })())

    }.bind(this));

    return q.all(promises).then(function(data) {
        var finalPageData = {};

        data.forEach(function(bit, idx) {
            finalPageData[route.resolve[idx].datasource] = bit;
        });

        return finalPageData;
    });

};