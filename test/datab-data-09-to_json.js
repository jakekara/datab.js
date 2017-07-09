// tests for datab.data.to_json

const teststuff = require("./teststuff.js");
const datab = teststuff.datab;
const assert = teststuff.assert;
const json_equal = teststuff.json_equal;
const big_matrix = teststuff.big_matrix;
const car_obj = teststuff.car_obj;

describe("datab.data.to_json()", function(){


    it(".to_json() returns a json string for an obj with an empty matrix", function(){
	try{
	    JSON.parse(new datab.data().to_json());
	}
	catch(e){
	    assert.fail("Invalid JSON: ", e);
	}
    });

    it(".to_json() returns a json string for an obj with an the car object", function(){
	try{
	    JSON.parse(new datab.data().from_obj(car_obj()).to_json());
	}
	catch(e){
	    assert.fail("Invalid JSON: ", e);
	}
    });

    it(".to_json() returns a json string for an obj with a big random object", function(){
	try{
	    JSON.parse(new datab.data(big_matrix()).to_json());
	}
	catch(e){
	    assert.fail("Invalid JSON: ", e);
	}
    });

    describe(".to_json() can be deserialized with to_obj to restore an equivalent datab.data object", function(){
	var test_to_json_serialization = function(label, dobj){

	    it(".to_json() serialization test: " + label, function(){
		var copy = dobj.copy();
		assert.equal(true, copy.equals(new datab.data().from_obj(JSON.parse(dobj.to_json(true)))));
	    });
	}

	test_to_json_serialization("empty set", new datab.data());
	test_to_json_serialization("car data set", new datab.data().from_obj(car_obj()));
	test_to_json_serialization("big random 1000, 100", new datab.data(big_matrix()));
    })

    
});
