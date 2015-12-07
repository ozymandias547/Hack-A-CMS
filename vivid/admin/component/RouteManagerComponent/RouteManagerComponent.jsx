var React = require('react');
var _ = require('underscore');
var deepcopy = require('deepcopy');

if (typeof window !== "undefined") {
    require('./RouteManagerComponent.scss');
}

/*
 * The data that this component needs to function. It uses the 'datasource' name.
 */
module.exports.contract = function() {
    return {
        routes: "core/routes"
    }
};


module.exports.component = function() {

    var RouteManagerComponent = React.createClass({

        render: function() {

            var AddRouteWizard = require('./AddRouteWizard/AddRouteWizard.jsx');

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

            var addRouteWizard = null;

            if (this.props.component.isAddRouteWizardOpen) {
                addRouteWizard = <AddRouteWizard wizardValues={this.props.component.wizardValues} dispatch={this.props.dispatch} componentId={this.props.componentId}/>;
            }

            return (
                <div className="RouteManagerComponent">
                    <div className="toolbar">
                        <a href="" onClick={this.onAddRouteClick}>Add route...</a>
                    </div>
                    {addRouteWizard}
                    <div className="routes-container">
                        { this.props.component.routes.map(routeItem)}
                    </div>
                </div>
            );
        },
        onAddRouteClick: function(e) {
            e.preventDefault();
            this.props.dispatch({type: "NEWROUTEWIZARD_VISIBILITY", isAddRouteWizardOpen: true, componentId: this.props.componentId})
        },
        onKeyDown: function(e) {
            if (e.which === 13) {

                var newRouteName = this.refs.routeName.value;

                this.props.dispatch({
                    type: "NEW_ROUTE_LOADED",
                    componentId: this.props.componentId,
                    sendToAllComponentsOfThistype: false,
                    routeName: newRouteName
                });

                this.refs.routeName.value = "";

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
                state.wizardValues = {
                    routeName: "Untitled",
                    urls: []
                };
                state.isLoadingRoute = false;
                state.isAddRouteWizardOpen = true;
                state.routes = [{ name: "Something", text: "HOLY COW", isVisible: true}, { name: "Another thing", text: "HOLY COW", isVisible: true}, { name: "Wowowo!", text: "HOLY COW", isVisible: true}];
                break;
            case "NEW_ROUTE_LOADED":
                state.isLoadingRoute = false;
                state.routes.push({ name: action.routeName, text: "HOLY COW", isVisible: true});
                break;
            case "NEWROUTEWIZARD_VISIBILITY":
                state.isAddRouteWizardOpen = action.isAddRouteWizardOpen;
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