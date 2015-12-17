var React = require('react');
var _ = require('underscore');
var AddRouteWizard = require('./AddRouteWizard.jsx');
var AddRouteWizardListeners = require('./AddRouteWizard.jsx').listeners;
var RouteItems = require('./RouteItems.jsx');
var RouteItemsReducer = require('./RouteItems.jsx').listeners;
var utils = require('../../../lib/utils');

utils.runOnBrowser(function() {
    require('./RouteManagerComponent.scss');
});

/*
 * The data that this component needs to function. It uses the 'datasource' name.
 */
module.exports.contract = {
    routes: "core/routes"
};

module.exports.component = React.createClass({

    render: function() {

        return (
            <div className="RouteManagerComponent">
                <AddRouteWizard {...this.props.component.AddRouteWizard } componentId={this.props.componentId} dispatch={this.props.dispatch} />
                <RouteItems {...this.props.component.RouteItems } componentId={this.props.componentId} dispatch={this.props.dispatch}/>
            </div>
        );
    }

});


/*
 * Reducer only has access to this components state.  it can listen to all events going through the system though.
 */
module.exports.reducer = function(state, action) {

    if (!state.AddRouteWizard) {
        state.AddRouteWizard = {};
    }

    if (!state.RouteItems) {
        state.RouteItems = [];
    }

    AddRouteWizardListeners(state.AddRouteWizard, action);
    RouteItemsReducer(state.RouteItems, action);

    return state;
};
