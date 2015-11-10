import React, { Component } from 'react';

class LayoutOneColumn extends Component {
    render() {

        var head = "";
        var slot1 = "";

        this.props.children.forEach(function(child) {
            if (child.type.displayName === "Head") {
                head = child;
            }
            
            else if (child.props.insertInto === "slot1") {
                slot1 = child;
            }
        });

        return <html>
            {head}
            <body>{slot1}</body>
        </html>;
    }
}


export default LayoutOneColumn;
