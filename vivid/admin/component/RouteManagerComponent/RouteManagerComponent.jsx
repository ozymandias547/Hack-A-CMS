var React = require('react');

var RouteManagerComponent = React.createClass({
    render: function() {

        var routeItem = function(route) {
            return <div>{route.name}</div>;
        };

        return (
            <div>
                <h4>Route Manager Component:</h4>
                {this.props.routes.map(routeItem)}
            </div>
        );
    }
});

module.exports = RouteManagerComponent;