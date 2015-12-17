var React = require('react');

module.exports.contract = {
    route: "core/route"
};

module.exports.component = React.createClass({

    render: function() {

        return (
            <div className="PageBuilder">
                <h1>Page Builder for {this.props.component.route.name}</h1>
            </div>
        );
    }

});

module.exports.reducer = function(props, action) {

    action.onAction("@@redux/INIT changePage", function() {
        props.route = action.pageData["route"];
    });

    return props;
};