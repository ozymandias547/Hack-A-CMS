var React = require('react');
var _ = require('underscore');
var classNames = require('classnames');

var RouteItem = React.createClass({
    render: function() {

        if (this.props.route.isVisible) {

            var dataItems = function(dataItem) {
                return (
                    <div>datasource: {dataItem.datasource}</div>
                )
            };

            var urlItems = function(url) {
                return (
                    <div><a href={url}>{url}</a></div>
                )
            }

            var btnClass = classNames({
                'routeItemContainer': true,
                'selected': this.props.route.isSelected
            });

            return (
                <div className={btnClass} onClick={this.onRouteContainerClick}>
                    <div className="routeName">
                        {this.props.route.isSelected}
                        {this.props.route.name}
                    </div>
                    <div className="right-arrow"></div>
                    <div className="station">
                        <div><strong>Match urls:</strong></div>
                        <div className="stationItem">
                            {this.props.route.urls.map(urlItems)}
                        </div>
                    </div>
                    <div className="right-arrow"></div>
                    <div className="station">
                        <div>Gather data</div>
                        <div>{this.props.route.resolve.map(dataItems)}</div>
                    </div>
                    <div className="right-arrow"></div>
                    <div className="station">
                        <div>Render Page</div>
                    </div>
                    <div className="right-arrow"></div>
                </div>
            );
        } else {
            return null;
        }
    },

    onRouteContainerClick: function(e) {
        this.props.dispatch({type: "ROUTE_ITEM_CONTAINER_CLICK",  sendToAllComponentsOnPage: true, clickedRoute: this.props.route})
    }

});

module.exports = RouteItem;
