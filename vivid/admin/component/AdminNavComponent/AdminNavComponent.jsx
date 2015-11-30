var React = require('react');

var AdminNavComponent = React.createClass({
    render: function() {
        return (
            <div>
                <a href="/">Route Manager</a>
                <a href="/config">Config</a>
            </div>
        );
    }
});

module.exports = AdminNavComponent;
