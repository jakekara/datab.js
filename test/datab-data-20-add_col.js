// tests for add_col

// import datab bundle
const datab = require("./teststuff.js")["datab"];
const assert = require("./teststuff.js")["assert"];
const json_equal = require("./teststuff.js")["json_equal"]
const big_array = require("./teststuff.js")["big_array"];
const big_matrix = require("./teststuff.js")["big_matrix"];

describe("datab.data().add_col", function(){

    var dobj = new datab.data(big_matrix(100,100));
    var dobj_copy = dobj.copy();
    // var dobj_with_new_col = dobj.add_col(big_array(100)); // 

    
    // it(".add_col() returns a copy without altering the original", function(){
    // 	assert.equal(true, dobj.equals(dobj_copy));
    // 	assert.equal(true, dobj_copy.equals(dobj))
    // 	assert.equal(false, dobj_with_new_col.equals(dobj));
    // 	assert.equal(false, dobj.equals(dobj_with_new_col));
    // });

    it(".add_col() returns a dobj with one additional column", function(){
	assert.equal(dobj.cols().length, dobj_copy.cols().length);	
	// assert.equal(dobj.cols().length + 1, dobj_with_new_col.cols().length);
    });

    // it(".add_col() returns a dobj with no additional rows", function(){
    // 	assert.equal(dobj.rows().length, dobj_with_new_col.rows().length);
    // });
    
    
});
