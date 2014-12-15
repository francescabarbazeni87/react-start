var React = require('react');
var PieChart = require('../components/PieChart');


var data = [
    {name: "Apples", count: 10},
    {name: "Oranges", count: 20},
    {name: "Bananas", count: 5},
    {name: "Blueberries", count: 42},
    {name: "mangoes ", count: 29}
];


var ChartPage = React.createClass({
    getInitialState: function() {
        return {data: data};
    },

    render: function() {
        return (
            <PieChart data={this.state.data} title="Sample Fruits"/>
            );
    }
});


//React.renderComponent(ChartPage(), document.body);

module.exports = ChartPage;