/*
 * datab - main entry point for datab library
 */

const data = require("./datab-data.js")["data"];
const ui = require("./datab-ui.js")["ui"];

exports.ui  = ui; 
exports.data = data;
