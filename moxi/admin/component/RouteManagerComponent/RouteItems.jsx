var React = require('react');
var _ = require('underscore');
var RouteItem = require('./RouteItem.jsx');
var shortid = require('shortid');

var RouteItems = React.createClass({

    render: function() {

        return (
            <div>
                {this.props.routes.map(function(route) {
                    return (
                        <RouteItem
                            {...route}
                            dispatch={this.props.dispatch}
                            componentId={this.props.componentId}
                            routes={this.props.routes}
                        />
                    )
                }.bind(this))}
            </div>
        )

    }

});

var reducers = function(props, action) {

    action.onAction("@@redux/INIT changePage", function() {
        props.routes = [];
        props.routes = _.toArray(action.pageData.routes).map(convertDomainToViewObject);

        function convertDomainToViewObject(domain) {

            domain.isVisible = true;
            domain.isSelected = false;
            domain.needsToBeSaved = false;

            domain.urls = domain.urls.map(function(url) {
                return {
                    url: url,
                    isBeingEdited: false
                }
            });

            return domain;
        }

    });

    action.onAction("ADD_NEW_ROUTE_LOADED", function() {
        action.newRoute.isVisible = true;
        props.routes.push(action.newRoute);
    });

    action.onAction("ROUTE_ITEM_CONTAINER_CLICK BODY_CLICK", function() {
        props.routes.forEach(function(route) {
            route.isSelected = false;
        });
    });

    setupChildReducers(props, action);

};

function setupChildReducers(props, action) {
    props.routes.forEach(function(route) {

        action.onAction("@@redux/INIT changePage", function() {
            route.id = shortid.generate();
            RouteItem.reducer(route, action);
        });

        RouteItem.reducer(route, action);

    });
}

module.exports = RouteItems;
module.exports.reducers = reducers;
