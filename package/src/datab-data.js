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
 *         to_json - create a json string of the data
 *          to_csv - output a csv
 *          to_obj - output as an array of (dict-like) objects
 *      to_csvblob - create a downbloadable csv blob
 *
 *      from_input - create data object from a file input selection 
 *                   ( csv files only )
 *        from_obj - create data object from an array of dict-like
 *                   row objects
 * 
 */

const d3 = require("d3");

/* 
 * data constructor - create a data object from a two-dimensional array
 *    args: arr - a matrix (2d-array) with column headers
 */
var data = function( matrix )
{

    if ( typeof( matrix ) == "undefined" )
	var matrix = [[]];
    
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
 * to_obj - output array of row (dict-like) objects
 */
data.prototype.to_obj = function()
{
    var ret = [];

    var cols = this.index( "col" );
    this.rows().forEach( function( r ){
	var obj = {};
	
	r.forEach( function( a, i ){
	    obj[cols[i]] = a;
	});

	ret.push(obj);
	
    });
    
    return ret;			 
}

/*
 * to_csvblob - create file-like csv blob
 */
data.prototype.to_csvblob = function()
{
    return new Blob([this.to_csv()], { type: 'text/csv;charset=utf-8;' });
}

/*
 * to_jsonblob - create file-like csv blob
 */
data.prototype.to_jsonblob = function()
{
    return new Blob([this.to_json()], { type: 'application/json;charset=utf-8;' });
}


/*
 * to_csv - output csv
 */
data.prototype.to_csv = function( index_col, index_row )
{
    return d3.csvFormat( this.to_obj() );
}

/*
 * to_json - output json string
 */
data.prototype.to_json = function()
{
    return JSON.stringify( this.to_obj() );
}

/*
 * from_obj - create datab.data object from an array of row objects
 */
data.prototype.from_obj = function(obj)
{
    if ( obj.length < 1 )
	return [[]];
    
    var col_index = Object.keys( obj[0] );
    var rows = [];
    
    for ( var i in obj )
    {
	var obj_row = obj[i];
	var row = [];
	
	for ( var c in col_index )
	{
	    row.push(obj_row[col_index[c]]);
	}
	
	rows.push(row);
    }

    var ret = new data( rows );
    ret.index( "col", col_index );
    
    return ret;
}


/*
 * from_input - read a csv from a file input field
 */
data.prototype.from_input = function( sel, callback )
{
    
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
	    callback( new data([[]]).from_obj( d3.csvParse( reader.result )));
	}

	reader.readAsText(file);
    });
}
