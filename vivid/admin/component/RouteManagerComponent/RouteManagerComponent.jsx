var React = require('react');
var _ = require('underscore');
var deepcopy = require('deepcopy');

module.exports.component = function(Vivid) {

    var RouteManagerComponent = React.createClass({
        render: function() {

            var routeItem = function(route) {
                return <div>{route.name}</div>;
            };

            var LoadingLabel = function() {
                return <div>Adding route...</div>;
            };

            return (
                <div>
                    <h4>Route Manager Component:</h4>
                    <button onClick={this.onAddRouteClick}>Add Route</button>
                    { this.props.pages[this.props.currentUrl].routes.map(routeItem)}
                    { this.props.currentPage.isLoadingRoute ? <LoadingLabel /> : null }
                </div>
            );
        },

        onAddRouteClick: function(e) {

            this.props.dispatch({ type: "LOADING_NEW_ROUTE" });

            setTimeout(function() {
                this.props.dispatch({ type: "NEW_ROUTE_LOADED" })
            }.bind(this), 200);

        }

    });

    return RouteManagerComponent;

};

module.exports.reducer = function(state, action) {

    switch(action.type) {
        case "LOADING_NEW_ROUTE":

            state.currentPage.isLoadingRoute = true;
            break;
        case "NEW_ROUTE_LOADED":
            state.currentPage.isLoadingRoute = false;
            state.pages[state.currentUrl].routes.push({ name: "A NEW ROUTE", text: "HOLY COW"});

            break;
    }

    return state;

};