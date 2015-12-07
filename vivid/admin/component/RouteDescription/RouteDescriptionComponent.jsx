var React = require('react');

module.exports = function(Vivid) {

    var RouteManagerComponent = React.createClass({
        render: function() {

            return (
                <div>
                    <div>The route name is: <strong>{this.props.page.name}</strong></div>
                    <div>It is using the layout: <strong>{this.props.page.layout}</strong></div>
                </div>
            );
        }
    });

    return RouteManagerComponent;

};
