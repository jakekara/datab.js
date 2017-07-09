// tests for datab.data.from_object()

// import datab bundle

const teststuff = require("./teststuff.js");
const datab = teststuff.datab;
const assert = teststuff.assert;
const json_equal = teststuff.json_equal;
const big_matrix = teststuff.big_matrix;
const car_obj = teststuff.car_obj;

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

    it("can deserialize with an __index ", function(){

	var dobj = new datab.data().from_obj(car_obj());

	// This test works because of the unsafe assumption that the dictionary
	// will be serialized the same way each time, but there is no guarantee
	// of "order" with key/val pairs. If this starts failing, take a closer
	// look at what is really going on. 
	
	assert.ok(!json_equal(dobj.index(),{
	    "col":["car","year","price"],
	    "row":["SALLY","VETTE-43","DMV-433"]				 
	}));
	assert.ok(json_equal(dobj.index(),{
	    "row":["SALLY","VETTE-43","DMV-433"],
	    "col":["car","year","price"]
	}));
	
    });

    
});

describe(".from_obj() and to_obj()", function(){

    it("multiple passes through from_obj() and to_obj() yield the same object", function(){

	var dobj = new datab.data().from_obj(car_obj());

	// just some double-checking without serializing, de-serializing
	assert.equal(true, json_equal(dobj.rows(), dobj.rows()));
	assert.equal(true,  json_equal(dobj.cols(), dobj.cols()));
	assert.equal(false,  json_equal(dobj.rows(), dobj.cols()));

	// serialize and de-serialize back to the same object
	// first test the .rows()
	assert.equal(true, json_equal(dobj.rows(),
				      dobj.from_obj(dobj.to_obj(true)).rows()));
	// then the .cols()
	assert.equal(true, json_equal(dobj.cols(),
				      dobj.from_obj(dobj.to_obj()).cols()));;

	// now check that we can create a new datab.data object from scratch
	// based on from_ob() and its rows match as expectedx
	assert.equal(true, json_equal(dobj.rows(),
				new datab.data().from_obj(dobj.to_obj()).rows()));

	assert.equal(true, json_equal(dobj.rows(),
				new datab.data()
				.from_obj(new datab.data().from_obj(
				    new datab.data().from_obj(car_obj()).to_obj()).to_obj())
				.rows()));

	
    });


});
