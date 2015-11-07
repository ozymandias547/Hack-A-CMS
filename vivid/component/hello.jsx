import React, { Component } from 'react';

if (typeof process === "undefined") {
    require('./hello.scss');
}

class Hello extends Component {
    render() {
        return <div>Welcome to {this.props.name}</div>;
    }
}

export default Hello;
