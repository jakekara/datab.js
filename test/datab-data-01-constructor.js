// import datab bundle
const datab = require("./teststuff.js")["datab"];
const assert = require("./teststuff.js")["assert"];
const json_equal = require("./teststuff.js")["json_equal"]
const big_array = require("./teststuff.js")["big_array"];
const big_matrix = require("./teststuff.js")["big_matrix"];
// const is_array = require("./teststuff.js")["is_array"];
// const is_function = require("./teststuff.js")["is_function"];
// const is_object = require("./teststuff.js")["is_object"];

const is_array = datab.is.is_array;
const is_function = datab.is.is_function;
const is_object = datab.is.is_object;

describe("datab.data basics", function(){

    describe('datab.data exists', function(){
	it('datab.data should exist', function(){
	    assert.ok(typeof(datab.data)!="undefined");
	});
    });

    describe('data.data is the type of thing we expect', function(){
	it('datab.data is a function', function(){
	    assert.equal(true, is_function(datab.data));
	    assert.ok(typeof(datab.data)=="function");
	});
	it('calling datab.data() returns an object', function(){
	    assert.ok(typeof(new datab.data(big_matrix()))=="object");
	    assert.equal(true, is_object(new datab.data(big_matrix())));
	});
	it("datab.data()  returns an instance of datab.data", function(){
	    assert.ok(new datab.data(big_matrix()) instanceof datab.data);
	    assert.ok(!(new datab.data(big_matrix()) instanceof Number));
	});
	it("datab.data().toString is '[object datab.data]'", function(){
	    assert.equal("[object datab.data]", new datab.data() + "");
	});
    });
    
});



