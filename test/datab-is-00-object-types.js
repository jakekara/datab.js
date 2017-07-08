const teststuff = require("./teststuff.js");
const big_array = teststuff.big_array;
const datab = teststuff.datab;
const assert = teststuff.assert;
const is_function = teststuff.datab.is.is_function;
const is_object = teststuff.datab.is.is_object;
const is_array = teststuff.datab.is.is_array;

describe("is.is_array", function(){
    it("is_array returns true for non-empty array", function(){
	assert.equal(true,is_array([1,2,3]));
	assert.equal(true,is_array([1,2,[]]));	
    });

    it("is_array returns true for empty array", function(){
	assert.equal(true, is_array([]));
    });
    it("is_array returns true for empty 2d array", function(){
	assert.equal(true, is_array([[]]));
    });
    it("is_array returns true for empty 3d array", function(){
	assert.equal(true,is_array([[[]]]));
    });
    it("is_array returns false for function", function(){
	assert.equal(false,is_array(function(){}));
    });
    it("is_array returns false for object", function(){
	assert.equal(false,is_array({}));
    });
    it("is_array returns false for string", function(){
	assert.equal(false,is_array("STRING"));
    });
    it("is_array returns false for tricky string", function(){
	assert.equal(false,is_array("[object Array]"));
    });
    it("is_array returns false for tricky number", function(){
	assert.equal(false,is_array(100));
    });
});

describe("is.is_function", function(){

    it("is_function returns true for a function", function(){
	assert.equal(true, is_function(function(){}));
    });

    it("is_function returns false for an array", function(){
	assert.equal(false, is_function([[]]));
    });
});

describe("is.is_object", function(){

    it("is_object returns true for {}", function(){
	assert.equal(true, is_object({}));
    });
    it("is_object returns false for []", function(){
	assert.equal(false, is_object([]));
    });
    it("is_object returns false for function(){}", function(){
	assert.equal(false, is_object(function(){}));
    });

    
});
