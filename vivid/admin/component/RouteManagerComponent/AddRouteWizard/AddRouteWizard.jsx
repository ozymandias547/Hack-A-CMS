var React = require('react');
var _ = require('underscore');

if (typeof window !== "undefined") {
    require('./AddRouteWizard.scss');
}

var AddRouteWizard = React.createClass({
    render: function() {

        return (
            <div className="AddRouteWizard">
                <div className="titlebar">
                    <input type="text" placeholder="route name..." />
                    <button className="add">Add</button>
                    <button className="cancel" onClick={this.onCancelClick}>Cancel</button>
                </div>
                <div className="seperator-bar"></div>
                <div className="right-arrow"></div>
                <div className="station">
                    <a href="#"> Match Url</a>
                </div>
                <div className="right-arrow"></div>
                <div className="station">
                    <div>Check Security</div>
                </div>
                <div className="right-arrow"></div>
                <div className="station">
                    <div>Gather Data</div>
                </div>
                <div className="right-arrow"></div>
                <div className="station">
                    <div>Render Page</div>
                </div>
                <div className="right-arrow"></div>
                <div className="station">
                    <div>Apply Skin</div>
                </div>
                <div className="right-arrow"></div>
            </div>
        );
    },
    onCancelClick: function(e) {
        this.props.dispatch({type: "NEWROUTEWIZARD_VISIBILITY", isAddRouteWizardOpen: false, componentId: this.props.componentId})
    }

});

module.exports = AddRouteWizard;
