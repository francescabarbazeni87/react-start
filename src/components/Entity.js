
var React = require('react');

var Api = require('../dispatcher/Api');
var EntityStore = require('../stores/EntityStore');
var PureRenderMixin = require('react/addons').PureRenderMixin;

var Alert = require('react-bootstrap').Alert;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var Panel = require('react-bootstrap').Panel;
var Input = require('react-bootstrap').Input;
var Well = require('react-bootstrap').Well;
var Jumbotron = require('react-bootstrap').Jumbotron;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;


var EntityActions = {
    getEntityData: function(entityId) {
        Api.getEntityData(entityId);
    }
};

var Entity = React.createClass({
    mixins: [PureRenderMixin],

    getInitialState: function() {
        var id = this.props.activeEntity; //current active entity id

        return  EntityStore.getState("companies", id);
    },

    componentDidMount: function() {
        EntityStore.addChangeListener(this._onChange);
        this.getEntityDataIfNeeded(this.props);
    },
    componentWillUnmount: function() {
        EntityStore.removeChangeListener(this._onChange);
    },
    componentWillReceiveProps: function(nextProps) {
        this.getEntityDataIfNeeded(nextProps);
    },

    getEntityDataIfNeeded: function(props) {
        var current = EntityStore.getState("id");
        if(this.props.activeEntity && this.props.activeEntity !== current) {

            EntityActions.getEntityData(this.props.activeEntity);

        }
    },

    _onChange: function() {
        this.setState(EntityStore.getState("companies", this.props.activeEntity));
    },

    render: function() {
        return (
            <form className="form-horizontal">
                <label htmlFor="name" id="name" >Name</label><p>{this.state.name}</p>
                <label htmlFor="profile" id="profile">Profile</label><p>{this.state.profile}</p>
                <label htmlFor="street" id="street">Street</label><p>{this.state.street}</p>
                <label htmlFor="city" id="city">City</label><p>{this.state.city}</p>
            </form>

            );
    }

});


module.exports = Entity;