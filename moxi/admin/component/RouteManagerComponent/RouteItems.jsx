var React = require('react');
var _ = require('underscore');
var classNames = require('classnames');
var UrlStation = require('./stations/UrlStation.jsx');
var DataStation = require('./stations/DataStation.jsx');

var RouteItems = React.createClass({

    render: function() {

        return (
            <div>
                {this.props.routes.map(function(route, routeIndex) {

                    var btnClass = classNames({
                        'routeItemContainer': true,
                        'selected': route.isSelected || route.needsToBeSaved
                    });

                    return !route.isVisible ? null : (
                        <div className={btnClass} onClick={this.onRouteContainerClick} data-index={routeIndex}>
                            <div className="routeName">
                                {route.name}
                            </div>
                            <div className="right-arrow"></div>
                            
                            <UrlStation route={route} dispatch={this.props.dispatch} componentId={this.props.componentId}/>

                            <div className="right-arrow"></div>
                            <div className="station">
                                <div>Gather data</div>
                                <div>{route.resolve.map(function(dataItem) {
                                    return (
                                        <div>datasource: {dataItem.datasource}</div>
                                    )
                                })}
                                </div>
                            </div>
                            <div className="right-arrow"></div>
                            <div className="station">
                                <a href={"/page-layout/" + encodeURIComponent(route.name)} data-internal-link>Build Page</a>
                            </div>
                            <div className="right-arrow"></div>
                            {!route.needsToBeSaved ? null : (
                                <div>
                                    <div className="seperator-bar"></div>
                                    <button onClick={this.saveChanges} data-index={routeIndex}>Save changes</button>
                                    <button onClick={this.revertChanges}>Cancel</button>
                                </div>
                            )}
                        </div>
                    );
                }.bind(this))}
            </div>
        )


    },

    onRouteContainerClick: function(e) {

        e.stopPropagation();

        this.props.dispatch({
            type: "ROUTE_ITEM_CONTAINER_CLICK",
            sendToAllComponentsOnPage: true,
            componentId: this.props.componentId,
            clickedRoute: this.props.routes[ parseInt(e.currentTarget.getAttribute("data-index")) ]
        })

    },

    saveChanges: function(e) {

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

    },

    revertChanges: function() {

    }

});

var listeners = function(props, action) {

    UrlStation.listeners(props, action);
    // TODO: Create a listener for every station and add a short uuid? (https://github.com/dylang/shortid)


    action.onAction("@@redux/INIT changePage", function() {
        props.routes = _.toArray(action.pageData.routes).map(convertDomainToViewObject);
    });

    action.onAction("ROUTE_ITEM_CONTAINER_CLICK", function() {
        props.routes.forEach(function(route) {
            if (route.name === action.clickedRoute.name) {
                route.isSelected = !route.isSelected;
            } else {
                route.isSelected = false;
            }
        });
    });

    action.onAction("FILTER_ROUTES", function() {
        props.routes.forEach(function(route) {
            if (route.name.indexOf(action.filterByString) !== -1) {
                route.isVisible = true;
            } else {
                route.isVisible = false;
            }
        });
    });

    action.onAction("ADD_NEW_ROUTE_LOADED", function() {
        action.newRoute.isVisible = true;
        action.newRoute.urls = action.newRoute.urls.map(function(url) {
            return {
                url: url,
                isBeingEdited: false
            }
        });
        props.routes.push(action.newRoute);
    });

    action.onAction("ROUTE_ITEM_UPDATED", function() {

        var editedRoute = convertDomainToViewObject(action.confirmedRoute);

        props.routes.forEach(function(route, idx) {
            if (route.name === action.currentRoute.name) {
                props.routes[idx] = editedRoute;
            }
        });

    });

    action.onAction("BODY_CLICK", function() {
        props.routes.forEach(function(route) {
            route.isSelected = false;
            route.urls.forEach(function(url) {
                url.isBeingEdited = false;
            })
        });
    })

};

function convertViewObjectToDomain(viewObject) {
    viewObject.urls = viewObject.urls.map(function(url) {
        return url.url;
    });

    viewObject = _.omit(viewObject, 'isSelected');
    viewObject = _.omit(viewObject, 'isVisible');
    viewObject = _.omit(viewObject, 'needsToBeSaved');

    return viewObject;
}

function convertDomainToViewObject(domain) {

    domain.isVisible = true;
    domain.isSelected = false;
    domain.needsToBeSaved = false;

    domain.urls = domain.urls.map(function(url) {
        return {
            url: url,
            isBeingEdited: false
        }
    });

    return domain;
}


module.exports = RouteItems;
module.exports.listeners = listeners;
