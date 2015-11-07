import './SampleComponent.sass';
import React, { Component } from 'react';

React.createClass({
    render: function() {
        return <div>Hello {this.props.name}</div>;
    }
});

ReactDOM.render(<HelloMessage name="John Doe hello" />, mountNode);