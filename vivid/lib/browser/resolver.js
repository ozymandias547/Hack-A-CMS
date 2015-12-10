var q = require('q');
var $ = require('jquery');

module.exports.resolveData = function(route) {

    var resolvedData = {};
    var promises = [];

    route.resolve.forEach(function(resolveItem) {

        var datasource = this.datasources[resolveItem.datasource];

        promises.push((function() {

            var deferred = q.defer();

            var url = datasource.url;

            $.ajax({
                url: url,
                success: function(data) {
                    deferred.resolve(data);
                }
            });

            return deferred.promise;
        })())

    }.bind(this));

    return q.all(promises).then(function(data) {
        var finalPageData = {};

        data.forEach(function(bit, idx) {
            finalPageData[route.resolve[idx].datasource] = bit;
        })

        return finalPageData;
    });

};