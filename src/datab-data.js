/**
 * datab-data.js - object for tabular data and basic transformations
 *
 *    functions are 
 * 
 *            data - constructor
 * 
 *            rows - retrieve matrix of rows
 *            cols - retrieve matrix of columns
 * 
 *           index - set or get the col or row index 
 *       transpose - transpose the table 
 *          equals - test if object is equivalent to another object
 *            copy - get a copy of a data object
 * 
 *         add_col - add a column
 *         add_row - add a row
 *        drop_col - drop a column
 *        drop_row - drop a row
 *       
 *          to_obj - output as an array of (dict-like) objects
 *         to_json - create a json string of the data
 *          to_csv - output a csv
 *      to_csvblob - create a downbloadable csv blob
 *
 *      from_input - create data object from a file input selection 
 *                   ( csv files only )
 *        from_obj - create data object from an array of dict-like
 *                   row objects
 * 
 */

import * as d3 from "d3";
import { default as is } from "./datab-is.js";

/** 
 * create a data object from a two-dimensional array
 * @constructor
 * @arg matrix - a matrix (2d-array) of the table
 */
var data = function( matrix )
{

    // default to empty 2d array
    if ( typeof( matrix ) == "undefined" )
	var matrix = [];	// zero rows

    // store rows for O(n) retrieval after initial
    // operation. sacrifices memory efficiency
    this.__rows = matrix;
    this.__cols = d3.transpose(matrix);

    // get the default index of an array of rows or cols
    var index_arr = function(arr){

	// otherwise, return an array of integers (as strings)
	return d3.range(arr.length)
	    .map(function(a){
		return String(a);
	    });
    }

    // create the default indexes
    this.__index = {
	"row" : index_arr(this.__rows),
	"col" : index_arr(this.__cols)
    };

    this.rows = function() { return this.__rows; };
    this.cols = function() { return this.__cols; };
    
    return this;
}

export {data};

/**
 * equals - test that two datab.data objects are equal
 * @a - first object
 * @b - second object
 */
data.prototype.equals = function(b){

    // if (( ! a instanceof data ) || ( ! b instanceof data ))
    if ( ! b instanceof (data))
	throw new Error("ERROR: Value must be instance of datab.data");
    
    return this.to_json(true) == b.to_json(true);
}

/**
 * copy - get a copy of the current object 
 */
data.prototype.copy = function()
{
    return new data( this.rows() )
	.index( "row", this.index( "row" ))
	.index( "col", this.index( "col" ))
}


/**
 * transpose - return a copy of the current object with the table
 * transposed
 */
data.prototype.transpose = function()
{
    return new data( this.cols() )
	.index("row", this.index( "col" ))
	.index("col", this.index( "row" ))
}


/** 
 * index - get or set a row or column index
 * @arg [axis] - "row" or "col"
 * @arg [arr] - the new array of index values
 */
data.prototype.index = function( axis, arr )
{
    if ( typeof( axis ) == "undefined" )
	return this.__index;
    
    if ( typeof( arr ) == "undefined" )
	return this.__index[axis];

    if ( this.__index[axis].length != arr.length )
	throw new Error("data.index: array must be same length as axis ");

    // TODO - add a test to make sure values are unique


    // July 3, 2017 - The below modification makes this function,
    // like all of the others, not mutate the original 
    this.__index[axis] = arr;
    return this;

    // var ret = this.copy();
    // ret.__index[axis] == arr;
    // return ret;
    
}


/** 
 * drop_row - drop a row 
 * @arg id - the index value of the row to drop
 */
data.prototype.drop_row = function( id )
{
    var id = String(id);

    var id_i = this.index( "row" ).indexOf( id );

    if ( id_i < 0 )
	throw new Error("data.drop_row: id not found");

    return new data(this.rows().splice( id_i ))
	.index( "row",
		this.index( "row" ).splice( id_i ))
	.index( "col", this.index( "col" ) );
}

/** 
 * drop_col - drop a column
 * arg id - the index of the column to drop
 */
data.prototype.drop_col = function( id )
{
    return this.transpose().drop_row( id ).transpose();
}

/** 
 * add_row - add a row 
 * @arg arr - the array of values: must be equal in
 * length to the number of columns
 * @arg id - the id of the new row to be added
 * @arg index - the position to insert the row
 */
data.prototype.add_row = function (  arr, id, index )
{
    // TODO - Add some sanity checks, make sure ID is not already used
    // by an existing row, and make sure the index is a sane value
    
    if ( typeof( index ) == "undefined" )
	var index = this.cols().length;

    if ( typeof( id ) == "undefined" ) 
	var id = String( index );

    if ( typeof( arr ) == "undefined" )
	throw new Error("data.add_row: requires an array of values");

    if ( arr.length != this.cols().length )
	throw new Error("data.add_row: invalid array length");

    var tmp_rows = this.rows();
    var tmp_index = this.index( "row" );
    
    tmp_rows.splice( index, 0, arr );
    tmp_index.splice( index, 0, id );

    return new data ( tmp_rows )
	.index( "row", tmp_index )
	.index( "col", this.index( "col" ) );
    
}

/** 
 * add_col - add a column
 * @arg arr - the array of values: must be equal in
 * length to the number of rows
 * @arg id - the id of the new col to be added
 * @arg index - the position to insert the col
 */
data.prototype.add_col = function ( arr, id, index )
{
    return this.transpose().add_row( arr, id, index ).transpose();
}


/** 
 * to_obj - output array of row (dict-like) objects
 * @arg {boolean} index - whether or to include the __index as a row property
 */
data.prototype.to_obj = function(index)
{
    var index = index | false;
    var ret = [];

    var cols = this.index( "col" );
    var row_index = this.index( "row" );
    
    this.rows().forEach( function( r, i ){

	

	var obj = {
	    // on the fence about whether to store the
	    // row index in this manner; possible collisions
	    // if a column is named __index, and duplication
	    // issues when deserializing back datab.data object
	    
	    // "__index":row_index[i] 

	};

	// ok, this is the compromise; I'll make it optional
	if (index) obj.__index = row_index[i];
	
	r.forEach( function( a, i ){
	    obj[cols[i]] = a;
	});

	ret.push(obj);
	
    });
    
    return ret;			 
}

/**
 * to_csvblob - create file-like csv blob
 */
data.prototype.to_csvblob = function()
{
    return new Blob([this.to_csv()], {
	type: 'text/csv;charset=utf-8;'
    });
}

/** 
 * to_jsonblob - create file-like json blob
 */
data.prototype.to_jsonblob = function()
{
    return new Blob([this.to_json()], {
	type: 'application/json;charset=utf-8;'
    });
}


/**
 * to_csv - output csv
 */
data.prototype.to_csv = function( index_col, index_row )
{
    // TODO - Can't quite remember why this accepts parameters. I think I
    // was overthinking it
    
    return d3.csvFormat( this.add_col(this.index( "row" ), "", 0 ).to_obj() );
}

/**
 * to_json - output json string
 */
data.prototype.to_json = function(index)
{
    var index = index || false;
    return JSON.stringify( this.to_obj(index) );
}

/**
 * from_obj - create datab.data object from an array of row objects
 * @arg obj - a table expressed as an array of dicts
 */
data.prototype.from_obj = function(obj)
{
    if ( typeof(obj) == "undefined" )
	return new data();

    if ( ! is.is_array( obj ) )
	throw new Error("from_obj requires an array of dict-like object");

    if ( obj.length < 1 )
	return new data();

    // base the column index (headers) off the first row object
    var col_index = Object.keys( obj[0] );
    var row_index = [];
    var rows = [];

    // check if rows contain __index property
    var row_index_i = col_index.indexOf("__index");

    if ( row_index_i >= 0)
	col_index.splice(row_index_i, 1);
    
    for ( var i in obj )
    {

	var obj_row = obj[i];

	// make sure that the row is an object and not some other type
	if ( ! is.is_object(obj_row) )
	    throw new ("Error: row is not an object");

	var key_count = Object.keys(obj_row).length;
	if ( row_index_i >= 0 ) key_count -= 1; // don't count __index 

	// make sure the row is the expected length
	if ( key_count != col_index.length )
	    throw new Error("Error: Shape mismatch. Exepcted " + col_index.length
			    + " columns. Got " + Object.keys(obj_row).length );

	var row = [];

	// count of row properties not in the first object ("extraneous" values)
	// var undef = 0;
	
	for ( var c in col_index )
	{
	    if ( typeof(obj_row[col_index[c]]) == "undefined")
		throw new Error("Error: Row is missing values!");
		// undef++;
	    row.push(obj_row[col_index[c]]);
	}

	// if the row does not have any of the properties, drop it
	// TODO - Should probably be more strict here
	// if ( undef == row.length)
	//     continue;
	
	// OK, here's more strict:
	// if ( undef > 0)
	//     throw new Error("Error: Row is missing values")
	//     // continue;

	if ( row_index_i >= 0)
	{
	    row_index.push(obj_row["__index"]);
	}
	
	rows.push(row);
    }

    var ret = new data( rows );
    ret.index( "col", col_index );

    if ( row_index_i >= 0 )
	ret.index( "row", row_index );

    // if there's a row index, set that, too
    // var row_index_i = col_index.indexOf("__index");
    
    // if ( row_index_i >= 0 ){

    // 	ret.index( "row", rows.map(function(a) {
    // 	    return a[row_index_i];
    // 	}))

    // 	return ret.drop_col("__index");
    // }

    return ret;
}


/** 
 * from_input - read a csv from a file input field
 * @arg sel - d3 selection to attatch to
 * @arg callback - function to call when file is selected
 */
data.prototype.from_input = function( sel, callback )
{
    // TODO - Maybe this function should be in the ui module
    
    sel.on("change", function(){
	var reader = new FileReader();
	
	var files = sel.node().files;

	if (typeof(files) == "undefined" || files.length < 1)
	{
	    console.error("no file selected");
	    return;
	}

	var file = files[0];

	reader.onloadend = function( e )
	{
	    callback( new data([[]])
		      .from_obj( d3.csvParse( reader.result )));
	}

	reader.readAsText(file);
    });
}

data.prototype.toString = function (){
    return "[object datab.data]";
}
