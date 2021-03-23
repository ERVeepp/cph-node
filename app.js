'use strict';
process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser
class AppBootHook {}
module.exports = AppBootHook;
