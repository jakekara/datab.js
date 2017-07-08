// import datab bundle

// TODO, just call require once and assign
// the exports to local scoped variables, like:
// const teststuff = require("./teststuff.js");
// datab = teststuff.datab;

const teststuff = require("./teststuff.js");

// const datab = require("./teststuff.js")["datab"];
const datab = teststuff.datab;
// const assert = require("./teststuff.js")["assert"];
const assert = teststuff.assert;
// const json_equal = require("./teststuff.js")["json_equal"];
const json_equal = teststuff.json_equal;
// const big_matrix = require("./teststuff.js")["big_matrix"];
const big_matrix = teststuff.big_matrix;
// const is_array = require("./teststuff.js")["is_array"];
// const is_array = teststuff.is_array;
// // const is_function = require("./teststuff.js")["is_function"];
// const is_function = teststuff.is_function;
// // const is_object = require("./teststuff.js")["is_object"];
// const is_object = teststuff.is_object;

describe("datab.data.to_obj", function(){

    var dobj = new datab.data(big_matrix());
    var cols = dobj.index("col");
    
    it(".to_obj() without argument returns an array", function(){
    	assert.equal(true, datab.is.is_array(dobj.to_obj()));
    });

    it(".to_obj() returns an array of objects", function(){
    	assert.equal(true, datab.is.is_array(dobj.to_obj()));
	dobj.to_obj().forEach(function(a){
	    assert.equal(true, datab.is.is_object(a));
	});
    })
    
    it(".to_obj() does not return an instance of datab.data", function(){
    	assert.equal(false, dobj.to_obj() instanceof datab.data);
    });

    it(".to_obj() returns the expected object", function(){
	dobj.to_obj().forEach(function(a){
	    cols.forEach(function(c){
		assert.ok(a.hasOwnProperty(c));
	    });
	});
    });

    it(".to_obj() returns an array of objects without a __index column", function(){
	dobj.to_obj().forEach(function(a){
	    assert.equal(false, a.hasOwnProperty("__index"));
	});
    });

    it(".to_obj(true) returns an array of objects with a __index column", function(){
	dobj.to_obj(true).forEach(function(a, i){
	    assert.equal(true, a.hasOwnProperty("__index"));
	    // will start to fail if we change the way column names default.
	    // this assumes columns are zero-index number strings['0','1',...]
	    assert.equal(true, a["__index"] == String(i));
	});
    });

    it(".to_obj() returns an array of objects with the expected number of keys", function(){
	var ROWS = 10
	var COLS = 100
	var dobj = new datab.data(big_matrix(ROWS,COLS));
	var obj = dobj.to_obj();
	obj.forEach(function(a){
	    assert.equal(COLS, Object.keys(a).length);
	});
    });

    it(".to_obj(true) returns an array of objects with the expected number of keys", function(){
	var ROWS = 10
	var COLS = 100
	
	var dobj = new datab.data(big_matrix(ROWS, COLS));
	var obj = dobj.to_obj(true);
	obj.forEach(function(a){
	    assert.equal(COLS + 1, Object.keys(a).length);
	});
    });
    
});
