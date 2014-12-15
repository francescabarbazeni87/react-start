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

//var Router = require("react-router");
//var app_router = require('./router/AppRouter');
//

//allow react dev tools work
window.React = React;


var ChartPage = require('./pages/ChartPage');


React.render(
    <ChartPage pippo="pluto"></ChartPage>,
    document.body
);



//Router.run(app_router, function (Handler) {
//    React.render(<Handler/>, document.body);
//});