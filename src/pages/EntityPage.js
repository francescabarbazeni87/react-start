var React = require('react');
var CompanyEditFields = require('./Company/EditFields');
var CompanyViewFields = require('./Company/ViewFields');
var Panel = require('react-bootstrap').Panel;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;

var PureRenderMixin = require('react/addons').PureRenderMixin;

var isView_docList = true;
var can_edit_company = true;

var Entity = require('../components/Entity');

var companyId = "17592186045429";



var EntityPage = React.createClass({
    getInitialState: function() {

        return {id: companyId, isView: true};
    },


    handleSubmit: function() {
        if (this.state.isView == true) {
            this.setState({isView: false});
        }
        else {
            this.setState({isView: true});

        }
//        this.setState({isView: false});

    },

    render: function() {
        return (<Entity activeEntity={this.state.id}></Entity>
            );
    }
});

module.exports = EntityPage;