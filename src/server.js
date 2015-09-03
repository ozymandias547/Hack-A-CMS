// TODO: write CMS server code.
var React = require("react");
require("babel/register");  // Allows require('.jsx') files to be compiled on the fly on node.

var HelloComponent = require('./component/test-component.jsx');
var HelloComponentInstance = React.createElement(HelloComponent, { name: "World" });

console.log(React.renderToString(HelloComponentInstance));  // The rendered template string to be shipped down to the client.

