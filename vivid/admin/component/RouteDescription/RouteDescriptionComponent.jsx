var React = require('react');

module.exports = function(Vivid) {

    var RouteManagerComponent = React.createClass({
        render: function() {

            return (
                <div>
                    <div>The title of this page is... <strong>{this.props.pages[this.props.currentUrl].meta.title }</strong></div>
                    <div>It is using the layout: <strong>{this.props.pages[this.props.currentUrl].layout}</strong></div>
                    <div>The route name is: <strong>{this.props.pages[this.props.currentUrl].name}</strong></div>
                </div>
            );
        }
    });

    return RouteManagerComponent;

};
