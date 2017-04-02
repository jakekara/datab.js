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
 * copy - get a copy of the current object 
 */
data.prototype.copy = function()
{
    return new data( this.rows() )
	.index( "row", this.index( "row" ))
	.index( "col", this.index( "col" ))
}


/* 
 * transpose - return a copy of the table transposed
 */
data.prototype.transpose = function()
{
    return new data( this.cols() )
	.index("row", this.index( "col" ))
	.index("col", this.index( "row" ))
}


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
	throw "data.index: array must be same length as axis ";

    // TODO - add a test to make sure values are unique
    
    this.__index[axis] = arr;

    return this;
}


/*
 * drop_row - drop a row 
 */
data.prototype.drop_row = function( id )
{
    var id = String(id);

    var id_i = this.index( "row" ).indexOf( id );

    if ( id_i < 0 )
	throw "data.drop_row: id not found";

    return new data(this.rows().splice( id_i ))
	.index( "row",
		this.index( "row" ).splice( id_i ))
	.index( "col", this.index( "col" ) );
}

/*
 * drop_col - drop a column
 */
data.prototype.drop_col = function( id )
{
    return this.transpose().drop_row( id ).transpose();
}

/*
 * add_row - add a row
 */
data.prototype.add_row = function (  arr, id, index )
{
    if ( typeof( index ) == "undefined" )
	var index = this.cols().length;

    if ( typeof( id ) == "undefined" )
	var id = String( id );

    if ( typeof( arr ) == "undefined" )
	throw "data.add_row: requires an array of values";

    if ( arr.length != this.cols().length )
	throw "data.add_row: invalid array length";


    var tmp_rows = this.rows();
    var tmp_index = this.index( "row" );
    
    tmp_rows.splice( index, 0, arr );
    tmp_index.splice( index, 0, id );

    return new data ( tmp_rows )
	.index( "row", tmp_index )
	.index( "col", this.index( "col" ) );
    
}


/*
 * add_col - add a column
 */
data.prototype.add_col = function ( arr, id, index )
{
    return this.transpose().add_row( arr, id, index ).transpose();
}

/*
 * to_csv - output csv
 */
data.prototype.to_csv = function()
{
    return d3.csvFormat(this
			// .add_row( this.index( "col" ), "", 0 ) 
			// .add_col( [""].push(this.index( "col" )),"", 0 )
			.rows());
}
