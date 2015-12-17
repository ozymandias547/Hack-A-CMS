var React = require('react');
var ReactRedux = require('react-redux');
var _ = require('underscore');

module.exports = function(Moxi) {

    var LayoutOneColumn = React.createClass({

        render: function() {

            var _this = this;

            // Build components array that will go into the blocks of the layout.
            this.blocks = {
                content1 : Moxi.createBlockContent("content", this.props.page)
            };

            function createPayload() {

                var payload = _.omit(_this.props, "appStore");

                return {
                    __html: 'window.__INITIAL_STATE=' + JSON.stringify(payload)
                }
            }

            return (
                <div>
                    {this.blocks.content1}
                </div>
            );

        }
    });

    function mapStateToProps(appStore) {
       return appStore;
    }


    return LayoutOneColumn;

};


