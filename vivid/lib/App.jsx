var React = require('react');
var ReactRedux = require('react-redux');
var _ = require('underscore');

module.exports = function(Vivid) {

    var App = React.createClass({

        render: function() {

            var thisPage = this.props.pages[this.props.currentUrl];

            var Layout = Vivid.layouts[thisPage.layout].component;

            return (
                <div><Layout page={this.props}/></div>
            );

        }
    });

    function mapStateToProps(appStore) {
        return appStore;
    }


    return ReactRedux.connect(mapStateToProps, null)(App);

};


