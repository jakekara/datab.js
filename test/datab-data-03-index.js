const d3 = require("d3");

// import datab bundle
const datab = require("./teststuff.js")["datab"];
const assert = require("./teststuff.js")["assert"];
const json_equal = require("./teststuff.js")["json_equal"];
const big_matrix = require("./teststuff.js")["big_matrix"];
const is_array = require("./teststuff.js")["is_array"];
const is_function = require("./teststuff.js")["is_function"];

describe("datab.data.index", function(){

    describe(".index('row') returns the same as .index()['row']", function(){
	var bm = big_matrix();
	var dobj = new datab.data(bm);

	assert.equal(true, json_equal(dobj.index('row'),dobj.index()['row']));
    });

    describe(".index('col') returns the same as .index()['col']", function(){
	var bm = big_matrix();
	var dobj = new datab.data(bm);

	assert.equal(true, json_equal(dobj.index('col'),dobj.index()['col']));
    });
    
    describe("index() defaults correctly", function(){
	
	var bm = big_matrix();
	var dobj = new datab.data(bm);

	it("datab.data.index()['row'] defaults to a list of integer strings", function(){
	    assert.equal(true, json_equal(
		dobj.index()["row"],
		bm.map(function(_,i) { return String(i); })));
	});

	it("datab.data.index()['col'] defaults to a list of integer strings", function(){
	    assert.equal(true, json_equal(
		dobj.index()["col"],
		bm[0].map(function(_,i){return String(i);})));
	});
    });

    describe("index() allows setting row names", function(){

	it("index('col',[...] throws an error with a wrong-sized array", function(){

	    var bm = big_matrix(500,1000);
	    var dobj = new datab.data(bm);

	    assert.throws(()=>{dobj.index('col', [1,2,3]);},Error);
	    assert.throws(()=>{dobj.index('col', [])},Error);
	});

	it("index('row',[...] throws an error with a wrong-sized array", function(){

	    var bm = big_matrix(500,1000);
	    var dobj = new datab.data(bm);

	    assert.throws(()=>{dobj.index('row', [1,2,3]);},Error);
	    assert.throws(()=>{dobj.index('row', [])},Error);
	});

	it("index('col',[...]) properly sets and retrieves the column headings", function(){
	    var bm = big_matrix();
	    var dobj = new datab.data(bm);
	    var column_names = bm[0].map(function(_,i){ return "Column " + i; });

	    // make sure they're not equal to start
	    assert.equal(false, json_equal(dobj.index("col"), column_names));

	    // then, presto change-o, they are...
	    dobj.index('col', column_names);
	    assert.equal(true, json_equal(dobj.index("col"), column_names));
	});

	it("index('row',[...]) properly sets and retrieves the row headings", function(){
	    var bm = big_matrix();
	    var dobj = new datab.data(bm);
	    var row_names = bm.map(function(_,i){ return "Row " + i; });

	    // make sure they're not equal to start
	    assert.equal(false, json_equal(dobj.index("row"), row_names));

	    // then, presto change-o, they are...
	    dobj.index('row', row_names);
	    assert.equal(true, json_equal(dobj.index("row"), row_names));
	});
	
    });
});
