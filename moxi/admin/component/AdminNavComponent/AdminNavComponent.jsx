var React = require('react');

if (typeof window !== "undefined") {
    require('./AdminNavComponent.scss');
}

module.exports.component = React.createClass({

    render: function() {

        return (
            <div className="component AdminNavComponent">
                <div className={ this.props.currentUrl === "/" ? "active" : "" }>
                    <a href="/" >
                        Route Manager
                    </a>
                </div>
                <div className={ this.props.currentUrl === "/config" ? "active" : "" }>
                    <a href="/config">
                        Config
                    </a>
                </div>
                <div className={ this.props.currentUrl === "/users" ? "active" : "" }>
                    <a href="/users">
                        Users
                    </a>
                </div>
            </div>
        );
    }

});




