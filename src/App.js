/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

require('es5-shim/es5-shim');
require('es5-shim/es5-sham');

var React = require('react'),
    mui = require('material-ui'),
    RaisedButton = mui.RaisedButton,
    FloatingActionButton = mui.FloatingActionButton,
    IconButton = mui.IconButton,
    FlatButton = mui.FlatButton,
    Checkbox = mui.Checkbox,
    Icon = mui.Icon,
    Paper = mui.Paper;


//var React = require('react/addons');

//
//var Router = require("react-router");
//var app_router = require('./router/AppRouter');
//
//
////allow react dev tools work
//window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

//var ChartPage = require('./pages/ChartPage');


var SomeAwesomeComponent = React.createClass({


    render: function() {
        return (

                    <FloatingActionButton icon="action-grade" />
                    
            );
    }

});


React.render(
    <SomeAwesomeComponent />,
    document.body
);

//
//
//Router.run(app_router, function (Handler) {
//    React.render(<Handler/>, document.body);
//});