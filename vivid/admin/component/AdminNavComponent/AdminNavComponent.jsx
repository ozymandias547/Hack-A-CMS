var React = require('react');

module.exports = function(Vivid) {

    var AdminNavComponent = React.createClass({
        render: function() {
            return (
                <div className="component AdminNavComponent">
                    <a href="/" onClick={this.handleClick}>Route Manager</a>
                    <a href="/config" onClick={this.handleClick}>Config</a>
                    <a href="/users" onClick={this.handleClick}>Users</a>
                </div>
            );
        },
        handleClick: function(e) {
            e.preventDefault();

            var url = e.target.pathname;

            if (url !== "/") {
                url = url.slice(1);
            }

            Vivid.router.setRoute(url);
        }
    });

    return AdminNavComponent;

};


