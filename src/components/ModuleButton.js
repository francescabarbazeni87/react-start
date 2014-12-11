/** @jsx React.DOM */

var React = require("react");

var ModuleButton = React.createClass({
    propTypes: {
        text: React.PropTypes.string.isRequired,
        code: React.PropTypes.string.isRequired,
        chiave: React.PropTypes.number.isRequired
        //asdasd
        //asdASD


        //key: React.PropTypes.number.isRequired
    },

    render: function () {

        console.log ("ModuleButton chiave: " + this.props.chiave.toString());

        return (
            <div key={this.props.chiave} draggable="true" className="btn btn-lg btn-secondary draggable" onDragStart={this.handleDragStart}>
                <span className="glyphicon glyphicon-move" onClick={this.props.onClick}/>
        {this.props.text}
            </div>
            );
    },

    handleDragStart: function (ev) {
        ev.dataTransfer.setData('code', this.props.code);
        ev.dataTransfer.setData('text', this.props.text);
        // console.log ("start dataTransfer code " + this.props.code + " text " + this.props.text)
    }

});

module.exports = ModuleButton;
