var React = require('react');
var utils = require('../../../lib/utils');

utils.runOnBrowser(function() {
    require('./RouteHistory.scss');
});

module.exports.component = React.createClass({

    render: function() {

        return (
            <div className="RouteHistory">
                <div><strong>Route History</strong></div>
                <div>{this.props.component.routeName}</div>
            </div>
        );
    }

});

/*
 * Reducer only has access to this components state.  it can listen to all events going through the system though.
 */
module.exports.reducer = function(state, action) {

    switch(action.type) {

        case "@@redux/INIT":
        case "changePage":
            state.routeName = "No route selected";
            break;

        case "ROUTE_ITEM_CONTAINER_CLICK":
            state.routeName = action.clickedRoute.name;
            break;

    }

    return state;
};
