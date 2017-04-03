/*
 * datab demo
 * 
 * will have to suffice until documentation exists
 */

const datab = require("../src/datab.js");
d3 = require("d3");

// a new table with three rows and three columns
d = new datab.data([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]);

// print the initial object
console.log("Initial");
console.log(d);

// name the columns "one" "two" and "three"
d = d.copy().index( "col",["one","two","three"] );

console.log( "Named columns" );
console.log( d );

// drop a column
d = d.drop_col( "two" );
console.log( "Dropped column 'two'" );
console.log( d );

// transpose the table
console.log( "transposed" );
console.log( d.transpose() );
console.log( d );

// add a row
console.log( "add row" );
d = d.add_row( [100, 200],
	       "four",
	       12 );

// ouput object formatn
console.log( "obj format" );
console.log( d.to_obj() );

var obj = d.to_obj();
console.log("from obj", console.log(datab.data.from_obj(obj)));


// output csv format
console.log("csv format");
console.log(d.to_csv());

// outpt json format
console.log("json format");
console.log(d.to_json());
console.log(d);

// add a column
console.log("add col");
d = d.add_col( [ 111, 222, 333, 444 ],
	       "A",
	       0 );


console.log(d);

// append_to only works in a browser environment of course.
// you need something to append it to (a d3 selection)
if ( typeof( document ) != "undefined" )
{
    dui = new datab.ui()
	.obj(d)
	.container(d3.select( "#container" ));
    
    dui.draw()
    
    console.log( "from_html" );

    console.log(dui.from_html( d3.select( "#container" )));

    console.log( "setting drop mode to valid value ");

    console.log( "setting drop mode to invalid value ");
    
    dui.drop_mode( "true" );
}

