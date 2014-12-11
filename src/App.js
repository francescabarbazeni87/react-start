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

var React = require('react/addons');
var Router = require("react-router");
var app_router = require('./router/AppRouter');
//

//allow react dev tools work
window.React = React;


//var TickTock = require('./pages/Demo');
//
//
//React.render(
//    <TickTock pippo="pluto"></TickTock>,
//    document.body
//);


//
//React.render(app_router,
//    document.body
//    //document.getElementById('content')
//);

Router.run(app_router, function (Handler) {
    React.render(<Handler/>, document.body);
});