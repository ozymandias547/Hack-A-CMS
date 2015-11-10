var React = require('react');

var LayoutOneColumn = require("../../component/LayoutOneColumn/LayoutOneColumn.jsx");
var Content = require("../../component/Content/Content.jsx");
var Head = require("../../component/Head/Head.jsx");


module.exports = React.createClass({
    render: function() {
        return <LayoutOneColumn>

            <Head>
                <title>{this.props.meta.title}</title>
            </Head>

            <Content insertInto="slot1">
                <div>Routes config</div>
                <a href="/admin/configuration">Config</a>
            </Content>

        </LayoutOneColumn>;
    }
});