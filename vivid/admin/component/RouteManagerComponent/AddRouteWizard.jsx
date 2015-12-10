var React = require('react');
var _ = require('underscore');
var $ = require('jquery');

var AddRouteWizard = React.createClass({
    render: function() {

        return (
            <div className="AddRouteWizard">
                <div className="titlebar">
                    <input type="text" placeholder="route name..." ref="routeNameInput"/>
                </div>
                <div className="seperator-bar"></div>
                <div className="right-arrow"></div>
                <div className="station">
                    <input type="text" placeholder="url" ref="url"/>
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
                <div className="seperator-bar"></div>
                <div>
                    <button className="add" onClick={this.onAddClick}>Add</button>
                    <button className="cancel" onClick={this.onCancelClick}>Cancel</button>
                </div>
            </div>
        );
    },
    onCancelClick: function(e) {
        this.props.dispatch({type: "NEWROUTEWIZARD_VISIBILITY", isAddRouteWizardOpen: false, componentId: this.props.componentId})
    },
    componentDidMount: function(){
        this.refs.routeNameInput.focus();
    },
    onAddClick: function(e) {



        this.props.dispatch({type: "ADD_NEW_ROUTE_LOADING", componentId: this.props.componentId});

        $.ajax({
            type: "post",
            url: "/api/core/routes",
            contentType: "application/json",
            data : JSON.stringify({
                "urls": [this.refs.url.value],
                "name": this.refs.routeNameInput.value,
                "layout": "admin/LayoutOneColumn",
                "resolve": [],
                "pageLayout": {
                    "content" : [
                        {
                            "name": "admin/RouteDescriptionComponent",
                            "type": "component"
                        }
                    ]

                }
            }),
            success: function(data) {
                this.props.dispatch({type: "ADD_NEW_ROUTE_LOADED", newRoute: data, componentId: this.props.componentId, sendToAllComponentsOfThistype: true})
            }.bind(this)
        })

    }

});

module.exports = AddRouteWizard;
