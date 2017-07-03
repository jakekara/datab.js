const d3 = require("d3");

// import datab bundle
const datab = require("./teststuff.js")["datab"];
const assert = require("./teststuff.js")["assert"];
const json_equal = require("./teststuff.js")["json_equal"];
const big_matrix = require("./teststuff.js")["big_matrix"];
const is_array = require("./teststuff.js")["is_array"];
const is_function = require("./teststuff.js")["is_function"];

describe("datab.data.transpose", function(){

    var bm = big_matrix(275, 10 * 1000);
    var dobj = new datab.data(bm);
    dobj.index('col', bm[0].map(function(_,i){ return "Column " + i; }));

    it("datab.data.transpose() does not mutate the object", function(){
	dobj.transpose();
	var dobj2 = dobj.transpose();	
	assert.equal(true, json_equal(dobj.rows(), bm));
	assert.equal(false, json_equal(dobj2.rows(), bm));
    });

    it("datab.data.transpose() does transpose the table", function(){
	var dobj2 = dobj.transpose();	
	assert.equal(true, json_equal(dobj2.rows(), d3.transpose(bm)));
    });

    it("datab.data.transpose().rows() does equal datab.data.cols()", function(){
	assert.equal(true, json_equal(dobj.transpose().rows(),
				      dobj.cols()));
    });

    it("datab.data.rows() does equal .transpose.transpose.rows()", function(){
	assert.equal(true, json_equal(dobj.rows(),
				      dobj.transpose().transpose().rows()));
	assert.equal(false, json_equal(dobj.transpose().rows(),
				       dobj.rows()));
	assert.equal(true, json_equal(dobj.transpose().transpose().transpose().rows(),
				       dobj.transpose().rows()));
    });


    it(".index('col') equals .transpose().index('row')", function(){
	assert.equal(true, json_equal(dobj.index('col'),
				      dobj.transpose().index('row')));

	assert.equal(false, json_equal(dobj.index('col'),
				       dobj.transpose().index('col')));
    });

    it(".index('row') equals .transpose().index('col')", function(){
	assert.equal(true, json_equal(dobj.index('row'),
				      dobj.transpose().index('col')));
	assert.equal(false, json_equal(dobj.index('row'),
				       dobj.transpose().index('row')));
    });
	      
});
