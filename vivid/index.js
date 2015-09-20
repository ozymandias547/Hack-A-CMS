var _ = require('underscore');
var express = require('express');
var fs = require('fs');
var utils = require('./lib/vivid-utils');


/*
 vivid will be an npm package.

 start will:
 1.  connect to the database through abstraction layer. (session and persistance)
 2.  if tables are not present, generate them and create boilerplate routes.
 3.  start serving routes based upon routes table
 */