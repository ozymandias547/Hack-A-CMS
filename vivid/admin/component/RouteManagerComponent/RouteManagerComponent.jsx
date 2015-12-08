var React = require('react');
var _ = require('underscore');
var deepcopy = require('deepcopy');
var AddRouteWizard = require('./AddRouteWizard.jsx');
var RouteItem = require('./RouteItem.jsx');
var utils = require('../../../lib/utils');

utils.runOnBrowser(function() {
    require('./RouteManagerComponent.scss');
});

module.exports.component = React.createClass({

    render: function() {

        var addRouteWizard = null;
        var addRouteCallToAction = null;

        var routeItem = function(route) {
            return (
                <RouteItem route={route} />
            )
        };

        if (this.props.component.isAddRouteWizardOpen) {
            addRouteWizard = <AddRouteWizard wizardValues={this.props.component.wizardValues} dispatch={this.props.dispatch} componentId={this.props.componentId}/>;
        } else {
            addRouteCallToAction = (
                <div className="toolbar">
                    <a href="" onClick={this.onAddRouteClick}>Add route...</a>
                </div>
            )
        }

        return (
            <div className="RouteManagerComponent">
                {addRouteCallToAction}
                {addRouteWizard}
                <div className="routes-container">
                    { this.props.component.routes.map(routeItem) }
                </div>
            </div>
        );
    },

    onAddRouteClick: function(e) {

        e.preventDefault();

        this.props.dispatch({
            type: "NEWROUTEWIZARD_VISIBILITY",
            isAddRouteWizardOpen: true,
            componentId: this.props.componentId
        });
    }

});



/*
 * The data that this component needs to function. It uses the 'datasource' name.
 */
module.exports.contract = {
    routes: "core/routes"
};

/*
 * Reducer only has access to this components state.  it can listen to all events going through the system though.
 */
module.exports.reducer = function(state, action) {

    switch(action.type) {

        case "@@redux/INIT":
            state.wizardValues = {
                routeName: "Untitled",
                urls: []
            };
            state.isLoadingRoute = false;
            state.isAddRouteWizardOpen = false;
            state.routes = Object.keys(state.data.routes).map(function (key) {return state.data.routes[key]});
            state.routes = state.routes.map(function(route) {
                route.isVisible = true;
                return route;
            });
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
