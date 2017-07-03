const d3 = require("d3");

// import datab bundle
const datab = require("./teststuff.js")["datab"];
const assert = require("./teststuff.js")["assert"];
const json_equal = require("./teststuff.js")["json_equal"];
const big_matrix = require("./teststuff.js")["big_matrix"];
const is_array = require("./teststuff.js")["is_array"];
const is_function = require("./teststuff.js")["is_function"];


describe("datab.data.equals tests for equality properly", function(){

    it("datab.data.equals() returns true for the same datab.data objects", function(){
	var dobj = new datab.data(big_matrix());
	assert.equal(true, dobj.equals(dobj));
    });

    it("datab.data.equals() returns false for the differing datab.data objects", function(){
	var dobj = new datab.data(big_matrix(500,600));	
	assert.equal(false, dobj.equals(new datab.data(big_matrix(100,200))));
    });

    it("datab.data.equals() throws error when not given datab.data object", function(){

	assert.throws(()=>{ new datab.data(big_matrix(100,200).equals([])) },
		      Error);

    });

    it("datab.data.equals() returns true if indexes and data both match", function(){
	var bm = big_matrix();
	assert.equal(true, new datab.data(bm).equals(new datab.data(bm)));
    });

    it("datab.data.equals() returns false if column index differs", function(){
	var bm = big_matrix();
	var dobj = new datab.data(bm);

	var dobj_with_columns_changed = new datab.data(bm)
	    .index('col', bm[0].map(function(_,i){
		return "column " + i;
	    }));

	var dobj_with_rows_changed = new datab.data(bm)
	    .index('row', bm.map(function(_,i){ return "row " + i; }));
			 
	assert.equal(true, new datab.data(bm).equals(new datab.data(bm)));
	
	assert.equal(false,
		     new datab.data(bm).equals(dobj_with_columns_changed));
	
	assert.equal(false,
		     new datab.data(bm).equals(dobj_with_rows_changed));

	assert.equal(true, new datab.data(bm).equals(dobj));
	
    });
    
    
    
});
   
