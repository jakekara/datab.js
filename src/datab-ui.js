/*
 * datab-ui.js - extend the datab-data object with browser functionality
 */

const d3 = require( "d3" );
const data = require( "./datab-data.js" )["data"];

var ui = function( )
{
    this.__drop_mode = false;
    this.__edit_mode = false;
    
    return this;
}

exports.ui = ui;

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

    var thead = table.append( "thead" );
    var tbody = table.append( "tbody" );

    thead.append("td").text("");
    
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

    var row_index = this.obj().index( "row" );

    tbody_rows.append( "th" )
	.attr("data-row-head", function(d, i){ return i; } )
	.text( function(d, i){ return row_index[i]; } );

    var row_cells = tbody_rows.selectAll( "td" )
	.data( function( d, i ){ return d; } )
	.enter()
	.append( "td" )
        .attr( "data-col", function(d, i){ return i; } )
	.text( function( d ){ return d; } );

    this.drop_mode( this.drop_mode() );
    this.edit_mode( this.edit_mode() );

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
	this.unhandle_clicks();
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
	this.unhandle_clicks();
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

