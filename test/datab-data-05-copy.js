const d3 = require("d3");

// import datab bundle
const datab = require("./teststuff.js")["datab"];
const assert = require("./teststuff.js")["assert"];
const json_equal = require("./teststuff.js")["json_equal"];
const big_matrix = require("./teststuff.js")["big_matrix"];
const is_array = require("./teststuff.js")["is_array"];
const is_function = require("./teststuff.js")["is_function"];

describe("copy() works", function(){

    it(".copy() returns an equivalent object", function(){
	var dobj = new datab.data(big_matrix());

	var dobj_copy = dobj.copy();
	dobj.equals(dobj_copy);
	
    });

    it("modifying a .copy() doesn't modify the original", function(){

	var bm = big_matrix();
	var dobj = new datab.data(bm);
	var dobj_index = new dobj.index();
	var dobj_copy =  dobj.copy();

	assert.equal(true,dobj.equals(dobj_copy));

	dobj_copy.index('col', bm[0].map(function(_,i){ return "Column " + i; }));

	assert.equal(false, dobj.equals(dobj_copy));

    });

});
   
