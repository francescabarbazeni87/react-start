/** @jsx React.DOM */

var React = require("react");

var Router = require("react-router");
//var Routes = Router.Routes;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;


// Handlers
var App = React.createFactory(require('../pages/Demo'));
//var App = React.createFactory(require('../pages/ChartPage'));
var NotFoundHandler = React.createFactory(require('../pages/NotFound'));

//var ListSurveys = React.createFactory(require('./components/list_surveys'));
//var AddSurvey = React.createFactory(require('./components/add_survey'));
//var EditSurvey = React.createFactory(require('./components/edit_survey'));
//var TakeSurveyCtrl = React.createFactory(require('./components/take_survey_ctrl'));

var AppRouter = (
        <Route path="/" handler={App}>
            <NotFoundRoute handler={NotFoundHandler}/>
        </Route>
    );

module.exports = AppRouter;