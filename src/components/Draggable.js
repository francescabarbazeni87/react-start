
var React = require('react');

var ModuleButton = require('./ModuleButton');

var Draggable = React.createClass({


    render: function () {
        var keys = [1000, 2000, 3000];
        return (
            <ul className="modules list-unstyled">
                <li><ModuleButton chiave={keys[0]} text='Pippo' code='pippo'/></li>
                <li><ModuleButton chiave={keys[1]} text='Pluto' code='pluto'/></li>
                <li><ModuleButton chiave={keys[2]} text='Orazio' code='orazio'/></li>
            </ul>
            );
    },

    shouldComponentUpdate: function () {
        return false;
    }
});

module.exports = Draggable;
