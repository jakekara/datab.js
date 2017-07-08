
const d3 = require("d3");

// import datab bundle
const datab = require("./teststuff.js")["datab"];
const assert = require("./teststuff.js")["assert"];
const json_equal = require("./teststuff.js")["json_equal"];
const big_matrix = require("./teststuff.js")["big_matrix"];
// const is_array = require("./teststuff.js")["is_array"];
// const is_function = require("./teststuff.js")["is_function"];

const is_array = datab.is.is_array;
const is_function = datab.is.is_function;

describe("datab.data.rows", function(){
    it("datab.data.rows is a function()", function(){
	assert.equal(true,is_function(new datab.data(big_matrix()).rows));
    });
    it("datab.data.rows returns an array", function(){
	assert.equal(true, is_array(new datab.data(big_matrix()).rows()));
    });
    it("datab.data.rows() returns the input array", function(){
	var bm = big_matrix();
	var dobj = new datab.data(bm);
	assert.equal(true, json_equal(dobj.rows(), bm));
	assert.equal(true, json_equal(new datab.data([[1,2,3],[4,5,6]]).rows(),
				      [[1,2,3],[4,5,6]]));
	assert.equal(false, json_equal(new datab.data([[1,2,3],[4,5,6]]).rows(),
				       [[1,2,3]]));
	assert.equal(bm.length, dobj.rows().length);
    });
});

describe("datab.data.cols", function(){
    it("datab.data.cols returns the tranposed input array", function(){
	var bm = big_matrix();
	var dobj = new datab.data(bm);
	assert.equal(true, json_equal(d3.transpose(bm), dobj.cols()));
	assert.equal(bm[0].length, dobj.cols().length);
    });
    it("datab.data.cols does not return the un-transposed input array", function(){
	var bm = big_matrix();
	var dobj = new datab.data(bm);
	assert.equal(false, json_equal(bm, dobj.cols()));
	assert.equal(false, json_equal(dobj.rows(), dobj.cols));
    });
});
