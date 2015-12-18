var React = require('react');
var classNames = require('classnames');
var UrlStation = require('./stations/UrlStation.jsx');
var EditableText = require('../../component/EditableText/EditableText.jsx');
var DataStation = require('./stations/DataStation.jsx');
var _ = require('underscore');
var shortid = require('shortid');

var RouteItem = React.createClass({

    render: function() {

        var btnClass = classNames({
            'routeItemContainer': true,
            'selected': this.props.isSelected || this.props.needsToBeSaved
        });

        return !this.props.isVisible ? null : (
            <div className={btnClass} onClick={this.onRouteContainerClick}>
                <div className="routeName">
                    {this.props.name}
                </div>
                <div className="right-arrow"></div>

                <div className="station">
                    <strong>Match urls:</strong>
                    {this.props.urls.map(function(url) {
                        return <EditableText
                            {...url}
                            dispatch={this.props.dispatch}
                            componentId={this.props.componentId}
                        />;
                    }.bind(this))}
                    <a onClick={this.onUrlAdd}>add url...</a>
                </div>



                <div className="right-arrow"></div>
                <div className="station">
                    <DataStation route={this.props} dispatch={this.props.dispatch} componentId={this.props.componentId} />
                </div>
                <div className="right-arrow"></div>
                <div className="station">
                    <a href={"/page-layout/" + encodeURIComponent(this.props.name)} data-internal-link>Build Page</a>
                </div>
                <div className="right-arrow"></div>
                    {!this.props.needsToBeSaved ? null : (
                        <div>
                            <div className="seperator-bar"></div>
                            <button onClick={this.onRouteSave} >Save changes</button>
                            <button onClick={this.onCancelChanges}>Cancel</button>
                        </div>
                    )}
            </div>
        );
    },

    onRouteContainerClick: function(e) {

        e.stopPropagation();

        this.props.dispatch({
            type: "ROUTE_ITEM_CONTAINER_CLICK",
            sendToAllComponentsOnPage: true,
            componentId: this.props.componentId,
            id: this.props.id,
            clickedRoute: _.findWhere(this.props.routes, { id: this.props.id })
        })

    },

    onRouteSave: function(e) {

        var request = require('browser-request');
        var editedRoute = convertViewObjectToDomain(this.props.routes[ parseInt(e.currentTarget.getAttribute("data-index")) ]);

        request({
            method:'POST',
            url: "/api/core/routes/" + encodeURIComponent(editedRoute.name),
            json: true,
            body: JSON.stringify(editedRoute)
        }, function(er, response, body) {

            var _editedRoute = editedRoute;

            this.props.dispatch({
                type: "ROUTE_ITEM_UPDATED",
                currentRoute: _editedRoute,
                confirmedRoute: body,
                componentId: this.props.componentId,
                sendToAllComponentsOfThistype: true
            })
        }.bind(this));

        function convertViewObjectToDomain(viewObject) {
            viewObject.urls = viewObject.urls.map(function(url) {
                return url.url;
            });

            viewObject = _.omit(viewObject, 'isSelected');
            viewObject = _.omit(viewObject, 'isVisible');
            viewObject = _.omit(viewObject, 'needsToBeSaved');

            return viewObject;
        }

    },

    onCancelChanges: function(e) {

    }

});

function reducers(props, action) {

    action.onActionFromThisComponent("ROUTE_ITEM_CONTAINER_CLICK", function() {
        props.isSelected = !props.isSelected;
    }, props);

    action.onAction("TOP_BAR_INPUT_CHANGE", function() {
        props.isVisible = props.name.indexOf(action.filterByString) !== -1;
    });

    setupChildReducers(props, action);

};


function setupChildReducers(props,action) {
    props.urls.forEach(function(url) {

        action.onAction("@@redux/INIT changePage", function() {
            url.id = shortid.generate();
            EditableText.reducer(url, action);
        });

        EditableText.reducer(url, action);

    });
}

module.exports = RouteItem;
module.exports.reducer = reducers;