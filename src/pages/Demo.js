var React = require('react');

var Alert = require('react-bootstrap').Alert;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var Panel = require('react-bootstrap').Panel;
var Jumbotron = require('react-bootstrap').Jumbotron;

var PureRenderMixin = require('react/addons').PureRenderMixin;
var Draggable = require('../components/Draggable');

var update = React.addons.update;

var ModuleButton = require('../components/ModuleButton');

var SetIntervalMixin = {
    componentWillMount: function() {
        this.intervals = [];
    },
    setInterval: function() {
        this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount: function() {
        this.intervals.map(clearInterval);
    }
};

var TickTock = React.createClass({
    mixins: [SetIntervalMixin, PureRenderMixin],  // Use the mixin
    getInitialState: function() {
        return {seconds: 0, dropZoneEntered: false, pippo: 0, items: [] };
    },
    componentDidMount: function() {
        this.setInterval(this.tick, 1000); // Call a method on the mixin
    },
    tick: function() {
        this.setState({seconds: this.state.seconds + 1});
    },
    handleSubmit: function() {
        this.setState({seconds: 0});
    },

    handleDragOver: function (ev) {
        // This allows handleDropZoneDrop to be called
        // https://code.google.com/p/chromium/issues/detail?id=168387
        ev.preventDefault();
    },

    handleDragEnter: function () {
        this.setState({dropZoneEntered: true});
    },

    handleDragLeave: function () {
        this.setState({dropZoneEntered: false});
    },

    handleDrop: function (ev) {
        var code = ev.dataTransfer.getData('code');
        var text = ev.dataTransfer.getData('text');

        var items = update(this.state.items, {
            $push: [{code: code, text: text}]
        });

        this.setState({
            items: items,
            dropZoneEntered: false
        });
    },


    render: function() {

        var dropZoneEntered = '';
        if (this.state.dropZoneEntered) {
            dropZoneEntered = 'drag-enter';
        }

        var items = this.state.items.map(function(item, i) {
            //console.log ("item " +item + "text " + item.text + " code " + item.code + " key " + i)
            return (
                <li><ModuleButton text={item.text} code={item.code} chiave={i} /></li>
                );
        }.bind(this));

        return (
            <div>
                <p>
                    <Draggable/>
                </p>



                <Jumbotron>
                    <h1>React Timer {this.props.pippo}</h1>
                    <Panel header="React Timer" bsStyle="primary">
                        <p>
                        React has been running for {this.state.seconds} seconds.
                        </p>
                        <form className="resetClock" onSubmit={this.handleSubmit}>

                            <Button type="submit" value="Post" bsStyle="primary" >Reset</Button>

                        </form>
                    </Panel>
                </Jumbotron>

                <ul className="modules list-unstyled">
                {items}
                </ul>
                <div
                className={'drop-zone well well-drop-zone ' + dropZoneEntered}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
                >
                Drag and drop a module
                </div>
            </div>
            );
    }
});


module.exports = TickTock;
