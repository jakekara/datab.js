// import datab bundle
const datab = require("./teststuff.js")["datab"];
const assert = require("./teststuff.js")["assert"];
const json_equal = require("./teststuff.js")["json_equal"];
const big_matrix = require("./teststuff.js")["big_matrix"];
const is_array = require("./teststuff.js")["is_array"];
const is_function = require("./teststuff.js")["is_function"];
const is_object = require("./teststuff.js")["is_object"];

describe("datab.data.to_obj", function(){

    var dobj = new datab.data(big_matrix());
    var cols = dobj.index("col");
    
    it(".to_obj() without argument returns an array", function(){
    	assert.equal(true, is_array(dobj.to_obj()));
    });

    it(".to_obj() returns an array of object", function(){
    	assert.equal(true, is_array(dobj.to_obj()));
	dobj.to_obj().forEach(function(a){
	    assert.equal(true, is_object(a));
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
    
});
