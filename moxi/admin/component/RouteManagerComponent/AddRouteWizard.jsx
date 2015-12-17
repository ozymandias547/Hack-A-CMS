var React = require('react');
var _ = require('underscore');

var AddRouteWizard = React.createClass({

    render: function() {

        if (this.props.isOpen) {
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
            )
        } else {
            return (
                <div className="toolbar">
                    <a href="" onClick={this.onAddRouteClick}>Add route...</a>
                </div>
            )
        }

    },

    onCancelClick: function(e) {
        this.props.dispatch({type: "NEWROUTEWIZARD_VISIBILITY", isAddRouteWizardOpen: false, componentId: this.props.componentId})
    },

    componentDidMount: function(){
        if (this.refs.routeNameInput) {
            this.refs.routeNameInput.focus();
        }
    },

    onAddClick: function(e) {

        this.props.dispatch({type: "ADD_NEW_ROUTE_LOADING", componentId: this.props.componentId});

        var request = require('browser-request');

        request({
            method:'POST',
            url: "/api/core/routes",
            json: true,
            body: JSON.stringify({
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
            })
        }, function(er, response, body) {
            this.props.dispatch({
                type: "ADD_NEW_ROUTE_LOADED",
                newRoute: body,
                componentId: this.props.componentId,
                sendToAllComponentsOfThistype: true
            })
        }.bind(this));

    },

    onAddRouteClick: function(e) {

        e.preventDefault();

        this.props.dispatch({
            type: "NEWROUTEWIZARD_VISIBILITY",
            isAddRouteWizardOpen: true,
            componentId: this.props.componentId
        });
    }

});

var listeners = function(props, action) {

    action.onAction("@@redux/INIT changePage", function() {
        props.routeName= "Untitled";
        props.urls = [];
        props.isOpen = false;
    });

    action.onAction("NEWROUTEWIZARD_VISIBILITY", function() {
        props.isOpen = action.isAddRouteWizardOpen;
    });

    action.onAction("ADD_NEW_ROUTE_LOADED", function() {
        props.isOpen = false;
    });

};



module.exports = AddRouteWizard;
module.exports.listeners = listeners;