var React = require('react');
var ReactRedux = require('react-redux');
var _ = require('underscore');

module.exports = function(Moxi) {

    var App = React.createClass({
        render: function() {

            var thisPage = this.props.pages[this.props.currentUrl];

            var Layout = Moxi.layouts[thisPage.layout].component;

            return (
                <div><Layout page={this.props}/></div>
            );

        },

        componentDidMount: function() {

            document.querySelector("body").addEventListener('click', function(e){
                if (e.target instanceof HTMLAnchorElement) {
                    if (e.target.attributes["data-internal-link"]) {
                        e.preventDefault();
                        Moxi.router.setRoute(e.target.pathname);
                    }
                }
            });

        },

        componentWillUnmount: function() {
            console.log("component unmount.");
        }
    });

    function mapStateToProps(appStore) {
        return appStore;
    }


    return ReactRedux.connect(mapStateToProps, null)(App);

};


