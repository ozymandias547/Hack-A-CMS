var React = require('react');
var _ = require('underscore');
var deepcopy = require('deepcopy');

// TODO: Add way to initialize the component scope variable
// TODO: Add way to dispatch to all components instead of just this one.


module.exports.contract = function() {
    // Receive data XYZ.  This data comes in on the props (from the resolver)
    // Can receive data from XYZ... perhaps some other component can change this component.
};


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
                    { this.props.componentState.routes.map(routeItem)}
                    { this.props.componentState.isLoadingRoute ? <LoadingLabel /> : null }
                </div>
            );
        },

        onAddRouteClick: function(e) {

            this.props.dispatch({ type: "LOADING_NEW_ROUTE", component: this.props.component, sendToAllComponentsOfThistype: false });

            setTimeout(function() {
                this.props.dispatch({ type: "NEW_ROUTE_LOADED", component: this.props.component, sendToAllComponentsOfThistype: false })
            }.bind(this), 200);

        }

    });

    return RouteManagerComponent;

};


// Rename state to "componentState"
module.exports.reducer = function() {

    return function(state, action) {
        switch(action.type) {
            case "@@redux/INIT":
                state.isLoadingRoute = false;
                state.routes = [{ name: "A NEW ROUTE", text: "HOLY COW"}];
                break;
            case "LOADING_NEW_ROUTE":
                state.isLoadingRoute = true;
                break;
            case "NEW_ROUTE_LOADED":
                state.isLoadingRoute = false;
                state.routes.push({ name: "A NEW ROUTE", text: "HOLY COW"});
                break;
        }

        return state;
    };


    // Only can change this components state, and any store that it sets up.



};