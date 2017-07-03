/*
 * datab-data.js tests
 */

const d3 = require("d3");

// import datab bundle
var FNAME="../dist/datab.rollup-bundle.js";
exports.datab = require(FNAME);

// set testing stuff up
exports. assert = require('assert');

// test two arrays for equality by
// stringifying their values
exports.json_equal = function(a1, a2)
{
    return JSON.stringify(a1) == JSON.stringify(a2);
}


// generate a big two-dimensional array
var big_array = function(len){

    if (len == 0) return [];
    
    var len = len || 500 + Math.round(Math.random() * 500);

    if (isNaN(len) || len < 0) throw new Error( "big_array: Invalid length: " + len );

    return d3.range(len);
}

exports.big_array = big_array;

exports.big_matrix = function(rows, cols){

    if (rows == 0) return [];
    if (cols == 0) return big_array().map(function(){ return []; });
    
    var rows = rows || 500 + Math.round(Math.random() * 500);
    var cols = cols || 250 + Math.round(Math.random() * 250)    

    return big_array(rows).map(function(){return big_array(cols);});

}


var is = function(a, expected){
    return Object.prototype.toString.call( a ) === expected;
}

exports.is = is;

exports.is_function = function(a){
    return is(a, '[object Function]');
}

exports.is_array = function(a){
    return is(a, '[object Array]');

}

exports.is_object = function(a){ return is(a, '[object Object]'); };
