var React = require('react');

var RouteManagerComponent = React.createClass({
    render: function() {
        return require("./RouterManagerComponent.jsx").call(this);
    }
});

module.exports = RouteManagerComponent;