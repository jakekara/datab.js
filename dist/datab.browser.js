(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

if (typeof(d3) == "undefined")
{
    const d3 = require("d3");
}

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

},{"d3":"d3"}],2:[function(require,module,exports){
/*
 * datab-ui.js - extend the datab-data object with browser functionality
 * 
 * functions are 
 * 
 *             ui - constructor
 *            obj - accessor (getter/setter for this ui object's 
 *                  datab.data object
 *      container - accessor for this object's container (d3 selection)
 *           draw - draw table in d3 selection
 *      from_html - update the datab.data object by reading from the
 *                  HTML table
 *      edit_mode - accessor for column/row header editing mode
 *      drop_mode - access for column/row drop mode
 *           drop - drop a row or column and redraw the table
 *       
 */

if ( typeof(d3) == "undefined" )
{
    const d3 = require( "d3" );
}

const data = require( "./datab-data.js" )["data"];

var ui = function( )
{
    this.__drop_mode = false;
    this.__edit_mode = false;
    
    return this;
}

exports.ui = ui;

/*
 * obj - set or get this object's datab.data object
 *     args: data_obj must be a datab.data instance
 */
ui.prototype.obj = function( datab_obj )
{
    if ( typeof( datab_obj ) == "undefined" )
	return this.__obj;

    if ( ! ( datab_obj instanceof data ))
	throw "data.ui.obj requires a datab.data object as only argument";
    this.__obj = datab_obj;

    return this;
    
}

/*
 * container - set the d3 selection where the table will draw
 */
ui.prototype.container = function( sel )
{
    if ( typeof( sel ) == "undefined" )
	return this.__container;

    // if ( ! ( sel instanceof d3.selection ))
    // 	throw "data.ui.container optional argument must be a d3 selection"

    this.__container = sel;

    return this;
}

/*
 * draw - draw table in d3 selection
 */
ui.prototype.draw = function( )
{
    var sel = this.__container;

    sel.html(""); 		// wipe out HTML
    
    var table = sel.append( "table" );

    var thead = table.append( "thead" ).append("tr");
    var tbody = table.append( "tbody" );

    // commented out to prevent drawing row index;
    // thead.append("td").text("");
    
    var thead_cols = thead.selectAll( "th" )
	.data( this.obj().index( "col" ) )
    	.enter()
    	.append( "th" )
	.attr( "data-col", function(d, i){ return i; } )
    	.attr( "data-col-head", function(d, i){ return i; } )
    	.text( function( d ) {
    	    return d;
    	});

    var tbody_rows = tbody.selectAll( "tr" )
	.data( this.obj().rows() )
	.enter()
	.append( "tr" )
    	.attr( "data-row", function(d, i){ return i; } )
    	// .attr( "data-row-head", function(d, i){ return i; } )

    // commented out to prevent drawing row index
    // var row_index = this.obj().index( "row" );
    // tbody_rows.append( "th" )
    // 	.attr("data-row-head", function(d, i){ return i; } )
    // 	.text( function(d, i){ return row_index[i]; } );

    var row_cells = tbody_rows.selectAll( "td" )
	.data( function( d, i ){ return d; } )
	.enter()
	.append( "td" )
        .attr( "data-col", function(d, i){ return i; } )
	.text( function( d ){ return d; } );

    this.drop_mode( this.drop_mode() );
    this.edit_mode( this.edit_mode() );

    return this;

}

/*
 * from_html - create datab.data object from an html table
 *      args: none
 *      rets: a new datab.data object
 *     notes: requires table to have a thead with th column names
 *            and tr elements for rows with td elements for cells
 */
ui.prototype.from_html = function(  )
{
    var sel = this.__container;
    
    var thead = sel.select( "thead" );

    var col_index = [];
    var row_index = [];
    var matrix = [];

    try{
	sel.select( "thead" ).selectAll( "th" )
	    .each( function(){
		col_index.push( d3.select(this).text() );
	    });
    }
    catch (e){
	throw "Error importing column headings."
	    + " note: <table> must contain <thead><th>... structure"
	    + " error: " + e;
    }

    try{
	sel.select( "tbody" ).selectAll( "th" )
	    .each( function( d, i ){
		row_index.push( d3.select(this).text() );
	    });
    }
    catch (e){
	throw "Error importing row headings."
	    + " note: <table> must contain <tbody><tr><th>... structure"
	    + " error: " + e;
    }

    try{
	
	var rows = sel.select("tbody").selectAll( "tr" )
	rows.each( function(){
	    var arr = [];

	    d3.select( this ).selectAll( "td" ).each(function(d){
		arr.push( d );
	    });

	    matrix.push( arr );
	});
	
    }
    catch (e){
	throw "Error importing rows and cells headings."
	    + " note: <table> must contain <tbody><tr><td>... structure"
	    + " error: " + e;
    }

    this.obj(new data( matrix )
	     .index( "row", row_index )
	     .index( "col", col_index ) );
    
}

/*
 * handle_drops - handle drop events 
 */
ui.prototype.handle_clicks = function( f )
{

    var that = this;

    this.container().selectAll( "th" )
	.on( "click", f );
}

/*
 * edit_mode - turn col/row edit mode on or off
 */
ui.prototype.edit_mode = function( val )
{
    if ( typeof(val) == "undefined" )
	return this.__edit_mode;

    if ( typeof(val) !== "boolean" )
	throw "datab.ui.drop_mode optional arg must be boolean or undefined";

    this.__edit_mode = val;

    if ( this.__edit_mode == false )
    {
	// this.unhandle_clicks();
	return;
    }

    var that = this;
    this.handle_clicks(function(){

	that.container().selectAll( "th" ).attr( "contenteditable", false );

	d3.select( this ).attr( "contenteditable", true );
	d3.select( this ).on( "blur", function(){
	    that.from_html();
	    that.draw();
	});

    });

    return this;


}

/*
 * drop_mode - turn col/row drop mode on or off
 */
ui.prototype.drop_mode = function( val )
{

    if ( typeof(val) == "undefined" )
	return this.__drop_mode;
    
    if ( typeof(val) !== "boolean" )
	throw "datab.ui.drop_mode optional arg must be boolean or undefined";
    
    this.__drop_mode = val;

    if ( this.__drop_mode == false )
    {
	// this.unhandle_clicks();
	return;
    }

    var that = this;
    this.handle_clicks(function(){

	var col_i = d3.select( this ).attr("data-col-head");
	var row_i = d3.select( this ).attr("data-row-head")

	if ( col_i != null )
	{
	    that.drop.call(that, "col", col_i );
	}
	else if ( row_i != null )
	{
	    that.drop.call(that, "row", row_i );
	}
	that.from_html();
	that.draw();
    });

    return this;
}

/*
 * unhandle_drops - unhandle drop events
 */
ui.prototype.unhandle_clicks = function ( )
{
        this.container().selectAll("th")
	.on( "click", null );

}

/*
 * handle_drop_col
 */
ui.prototype.drop = function( row_col, n )
{
    var selector = "[data-" + row_col + "='" + n + "']";
	console.log("selector", selector)
    this.container().selectAll( selector )
	.remove();

    this.from_html();
    this.draw();
}


},{"./datab-data.js":1,"d3":"d3"}],3:[function(require,module,exports){
/*
 * datab - main entry point for datab library
 */

const data = require("./datab-data.js")["data"];
const ui = require("./datab-ui.js")["ui"];

exports.ui  = ui; 
exports.data =   data;

},{"./datab-data.js":1,"./datab-ui.js":2}]},{},[3]);
