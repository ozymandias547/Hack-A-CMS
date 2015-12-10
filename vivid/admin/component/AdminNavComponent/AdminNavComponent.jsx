var React = require('react');

if (typeof window !== "undefined") {
    require('./AdminNavComponent.scss');
}

module.exports.component = React.createClass({

    render: function() {

        return (
            <div className="component AdminNavComponent">
                <div className={ this.props.currentUrl === "/" ? "active" : "" }>
                    <a href="/" onClick={this.handleClick} >
                        Route Manager
                    </a>
                </div>
                <div className={ this.props.currentUrl === "/config" ? "active" : "" }>
                    <a href="/config" onClick={this.handleClick}>
                        Config
                    </a>
                </div>
                <div className={ this.props.currentUrl === "/users" ? "active" : "" }>
                    <a href="/users" onClick={this.handleClick}>
                        Users
                    </a>
                </div>
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




