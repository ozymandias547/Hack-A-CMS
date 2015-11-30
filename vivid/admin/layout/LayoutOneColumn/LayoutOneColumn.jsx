var React = require('react');
var Redux = require('redux');
var ReactRedux = require('react-redux');
var _ = require('underscore');
var Vivid = require('../../../index.js');

var LayoutOneColumn = React.createClass({
    render: function() {

        var _this = this;

        // Build components array that will go into the blocks of the layout.
        this.blocks = {
            content1 : Vivid.createBlockContent("content1", this.props)
        };

        function createPayload() {

            var payload = _.omit(_this.props, "appStore");

            return {
                __html: 'window.__INITIAL_STATE=' + JSON.stringify(payload)
            }
        }

        return (
            <html>
                <head>
                    <title>{this.props.appStore.meta.title}</title>
                </head>
                <body>
                    {this.blocks.content1}
                    <script dangerouslySetInnerHTML={ createPayload() }></script>
                </body>
            </html>
        );

    }
});

function mapStateToProps(appStore) {

    return {
        appStore: appStore.pages[appStore.currentUrl]
    }

}


module.exports = ReactRedux.connect(mapStateToProps, null)(LayoutOneColumn);
