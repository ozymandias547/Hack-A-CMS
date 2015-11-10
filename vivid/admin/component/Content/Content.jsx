var React = require('react');

var Content = React.createClass({
    propTypes: {
        insertInto: React.PropTypes.string
    },
    render: function() {
        return <div>{this.props.children}</div>
    }
});

module.exports = Content;