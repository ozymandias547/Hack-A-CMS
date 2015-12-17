var React = require('react');
var ReactRedux = require('react-redux');
var _ = require('underscore');

if (typeof window !== "undefined") {
    require('./LayoutTopBarRightMenu.scss');
}

module.exports = function(Moxi) {

    var LayoutTopBarRightMenu = React.createClass({

        render: function() {

            // Build components array that will go into the blocks of the layout.
            this.blocks = {
                topBar : Moxi.createBlockContent("topBar", this.props),
                rightMenu : Moxi.createBlockContent("rightMenu", this.props),
                content : Moxi.createBlockContent("content", this.props)
            };

            return (
                <div className="LayoutTopBarRightMenu pure-g" onClick={this.onBodyClick}>
                    <div className="TopBar pure-u-1-1">{this.blocks.topBar}</div>
                    <div className="Content pure-u-18-24">{this.blocks.content}</div>
                    <div className="RightBar pure-u-6-24">{this.blocks.rightMenu}</div>
                </div>
            );

        },
        componentDidMount: function() {

            document.querySelector(".RightBar").style.height = window.innerHeight - document.querySelector(".RightBar").getClientRects()[0].top
            document.querySelector(".Content").style.height = window.innerHeight - document.querySelector(".Content").getClientRects()[0].top

        },

        onBodyClick: function(e) {
            this.props.dispatch({type: "BODY_CLICK", sendToAllComponentsOnPage: true});
        }
    });

    function mapStateToProps(appStore) {
        return appStore;
    }


    return ReactRedux.connect(mapStateToProps, null)(LayoutTopBarRightMenu);

};


