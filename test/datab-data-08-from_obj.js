// tests for datab.data.from_object()

// import datab bundle

const teststuff = require("./teststuff.js");
const datab = teststuff.datab;
const assert = teststuff.assert;
const json_equal = teststuff.json_equal;
const big_matrix = teststuff.big_matrix;
const car_obj = teststuff.car_dobj;

describe("datab.data.from_obj()", function(){

    it("datab.data.from_obj is a function()", function(){
	assert.ok(datab.is.is_function(new datab.data().from_obj));
    });

    it(".from_obj() with no argument returns a datab.data instance", function(){
	assert.ok(new datab.data().from_obj() instanceof datab.data);
    });

    it(".from_obj() throws an exception if its given a non-array string", function(){
	assert.throws(()=>{new datab.data().from_obj("BAD INPUT");}, Error);
    });
    it(".from_obj() throws an exception if its given a array of non-object", function(){
	assert.throws(()=>{new datab.data().from_obj("BAD INPUT");}, Error);
	assert.throws(()=>{new datab.data().from_obj([1,2,3]);},Error);
    });
    it(".from_obj() throws an exception if its given a non-array int", function(){
	assert.throws(()=>{new datab.data().from_obj(1);},Error);
    });
    
});
