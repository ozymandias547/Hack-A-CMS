var React = require('react');

var Head = React.createClass({
    render: function() {
        return <head>
        	{this.props.children}
        </head>;
    }
});

module.exports = Head;