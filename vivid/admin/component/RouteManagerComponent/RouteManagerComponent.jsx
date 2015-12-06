var React = require('react');
var _ = require('underscore');
var deepcopy = require('deepcopy');

if (typeof window !== "undefined") {
    require('./RouteManagerComponent.scss');
}


module.exports.contract = function() {
    // Receive data XYZ.  This data comes in on the props (from the resolver)
    // Can receive data from XYZ... perhaps some other component can change this component.
};


module.exports.component = function() {

    var RouteManagerComponent = React.createClass({

        componentDidMount: function() {
            document.querySelector(".RouteManagerComponent").style.height = window.innerHeight - document.querySelector(".RouteManagerComponent").getClientRects()[0].top
        },

        render: function() {

            var routeItem = function(route) {
                if (route.isVisible) {
                    return (
                        <div className="routeItemContainer">
                            {route.name}
                        </div>
                    );
                } else {
                    return null;
                }
            };

            return (
                <div className="RouteManagerComponent">
                    <h4>Route Manager Component:</h4>
                    <input type="text" placeholder="Route Name" ref="routeName" onKeyDown={this.onKeyDown}></input>
                    { this.props.component.routes.map(routeItem)}
                    { this.props.component.isLoadingRoute ? <div>Adding route...</div> : null }
                </div>
            );
        },

        onKeyDown: function(e) {
            if (e.which === 13) {

                var newRouteName = this.refs.routeName.value;

                this.props.dispatch({
                        type: "LOADING_NEW_ROUTE",
                        componentId: this.props.componentId,
                        sendToAllComponentsOfThistype: false}
                );

                this.refs.routeName.value = "";

                setTimeout(function() {

                    this.props.dispatch({
                        type: "NEW_ROUTE_LOADED",
                        componentId: this.props.componentId,
                        sendToAllComponentsOfThistype: false,
                        routeName: newRouteName
                    })

                }.bind(this), 200);
            }
        }

    });

    return RouteManagerComponent;

};

/*
 * Reducer only has access to this components state.  it can listen to all events going through the system though.
 */
module.exports.reducer = function() {

    return function(state, action) {
        switch(action.type) {
            case "@@redux/INIT":
                state.isLoadingRoute = false;
                state.routes = [{ name: "Something", text: "HOLY COW", isVisible: true}, { name: "Another thing", text: "HOLY COW", isVisible: true}, { name: "Wowowo!", text: "HOLY COW", isVisible: true}];
                break;
            case "LOADING_NEW_ROUTE":
                state.isLoadingRoute = true;
                break;
            case "NEW_ROUTE_LOADED":
                state.isLoadingRoute = false;
                state.routes.push({ name: action.routeName, text: "HOLY COW", isVisible: true});
                break;
            case "FILTER_ROUTES":
                state.routes.forEach(function(route) {
                    if (route.name.indexOf(action.filterByString) !== -1) {
                        route.isVisible = true;
                    } else {
                        route.isVisible = false;
                    }
                });
                break;
        }

        return state;
    };

};