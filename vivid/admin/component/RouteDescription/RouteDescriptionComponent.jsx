var React = require('react');

var RouteManagerComponent = React.createClass({
    render: function() {

        return (
            <div>
                <div>The title of this page is... <strong>{this.props.appStore.meta.title }</strong></div>
                <div>It is using the layout: <strong>{this.props.appStore.layout}</strong></div>
                <div>The route name is: <strong>{this.props.appStore.name}</strong></div>
            </div>
        );
    }
});

module.exports = RouteManagerComponent;