var React = require('react');
var _ = require('underscore');
var AddRouteWizard = require('./AddRouteWizard.jsx');
var AddRouteWizardListeners = require('./AddRouteWizard.jsx').reducers;
var RouteItems = require('./RouteItems.jsx');
var RouteItemsReducer = require('./RouteItems.jsx').reducers;
var utils = require('../../../lib/utils');
var shortid = require('shortid');

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
module.exports.reducer = function(props, action) {

    // Build the namespaces for each individual component;
    if (!props.AddRouteWizard) {
        props.AddRouteWizard = {
            id: shortid.generate()
        }
    }

    if (!props.RouteItems) {
        props.RouteItems = {
            id: shortid.generate()
        }
    }

    AddRouteWizardListeners(props.AddRouteWizard, action);
    RouteItemsReducer(props.RouteItems, action);

    return props;
};
