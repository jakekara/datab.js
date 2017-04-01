/*
 * datab-data.js - object for tabular data and basic transformations
 *
 *    functions are 
 * 
 *            data - constructor
 * 
 *            copy - get a copy of a data object
 *           index - set or get the col or row index
 *       transpose - transpose the table
 *         add_col - add a column
 *         add_row - add a row
 *        drop_col - drop a column
 *        drop_row - drop a row
 *       
 *         to_html - generate an html table
 *       append_to - append html table to a d3 selection
 *         to_json - create a json string of the data
 */

const d3 = require("d3");

/* 
 * data constructor - create a data object from a two-dimensional array
 *    args: arr - a matrix (2d-array)
 */
var data = function( matrix )
{
    this.__rows = matrix;
    this.__cols = d3.transpose(matrix);
    
    console.log(this.__rows.length);

    var index_arr = function(arr){
	return d3.range(arr.length)
	    .map(function(a){
		return String(a);
	    });
    }
    
    this.__index = {
	"row" : index_arr(this.__rows),
	"col" : index_arr(this.__cols)
    };

    this.rows = function() { return this.__rows; };
    this.cols = function() { return this.__cols; };
    
    return this;
}

exports.data = data;

/* 
 * index - set an row or column index
 */
data.prototype.index = function( axis, arr )
{
    if ( typeof( axis ) == "undefined" )
	return this.__index;
    if ( typeof( arr ) == "undefined" )
	return this.__index[axis];

    if ( this.__index[axis].length != arr.length )
    {
	throw "data.index: array must be same length as axis ";
    }

    this.__index[axis] = arr;

    return this;
    
}


/* 
 * copy - get a copy of the current object 
 */
data.prototype.copy = function()
{
}

/* 
 * transpose - return a copy of the table transposed
 */
data.prototype.transpose = function()
{
    throw "Not implemented";
}

/*
 * drop_col - drop a column
 */

/*
 * drop_row - drop a row 
 */

/*
 * add_col - add a column
 */

/*
 * add_row - add a row
 */

