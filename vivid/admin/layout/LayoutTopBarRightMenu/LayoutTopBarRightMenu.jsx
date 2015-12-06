var React = require('react');
var ReactRedux = require('react-redux');
var _ = require('underscore');

if (typeof window !== "undefined") {
    require('./LayoutTopBarRightMenu.scss');
}

module.exports = function(Vivid) {

    var LayoutTopBarRightMenu = React.createClass({

        render: function() {

            var _this = this;

            // Build components array that will go into the blocks of the layout.
            this.blocks = {
                topBar : Vivid.createBlockContent("topBar", this.props),
                rightMenu : Vivid.createBlockContent("rightMenu", this.props),
                content : Vivid.createBlockContent("content", this.props)
            };

            function createPayload() {

                var payload = _.omit(_this.props, "appStore");

                return {
                    __html: 'window.__INITIAL_STATE=' + JSON.stringify(payload)
                }
            }

            return (
                <div className="LayoutTopBarRightMenu pure-g">
                    <div className="TopBar pure-u-1-1">{this.blocks.topBar}</div>
                    <div className="Content pure-u-20-24">{this.blocks.content}</div>
                    <div className="RightBar pure-u-4-24">{this.blocks.rightMenu}</div>
                </div>
            );

        }
    });

    function mapStateToProps(appStore) {
        return appStore;
    }


    return ReactRedux.connect(mapStateToProps, null)(LayoutTopBarRightMenu);

};


