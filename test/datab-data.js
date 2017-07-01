/*
 * datab-data.js tests
 */

// import datab bundle
var FNAME="../dist/datab.rollup-bundle.js";
var datab = require(FNAME);

// set testing stuff up
var assert = require('assert');

// test two arrays for equality by
// stringifying their values
var json_equal = function(a1, a2)
{
    return JSON.stringify(a1) == JSON.stringify(a2);
}

// generate a big two-dimensional array
var big_array = function(rows, cols){
    var rows = rows || 500 + Math.round(Math.random() * 500);
    var cols = cols || 500 + Math.round(Math.random() * 500)    
    var ret = [];
}

describe('library exists', function(){
    it('datab.data should exist', function(){
	assert.ok(typeof(datab.data)!="undefined");
    });
});

describe('is a function', function(){
    it('datab.data should be a function', function(){
	assert.ok(typeof(datab.data)!="undefined");
    });
});

describe('returns an object', function(){
    it('datab.data should return an object',
       function(){
	   assert.ok(typeof(datab.data())=="object");
       });
});

describe('can be constructed', function(){
    it('datab.data can be constructed',
       function(){
	   var dobj = new datab.data([[1,2,3],
				      [4,5,6]]);
	   assert.ok(typeof(dobj) != "undefined");
       });
});

describe('can be constructed properly', function(){

    it('array comparison returns true for equal arrays',
       function(){
	   assert.ok(json_equal([[1,2,3],[4,5,6]],
				[[1,2,3],[4,5,6]]));
       });

    
    it('array comparison does not return false '
       + 'positive with different values',
       function(){
	   assert.ok(!json_equal([[1,2,3],[4,5,6]],
				 [[10,20,30],[40,50,60]]));
       });

    it('array comparison does not return false '
       + 'positive with different length arrays',
       function(){
	   assert.ok(!json_equal([[1,2,3],[4,5,6]],
				 [[1,2,3],[4,5,6],[7,8,9]]));
       });
    
    it('datab.data .rows() returns expected output ',
       function(){
	   var dobj = new datab.data([[1,2,3],
				      [4,5,6]]);
	   
	   assert.ok(JSON.stringify(dobj.rows()) ==
		     JSON.stringify([[1,2,3],
	       			     [4,5,6]]));
       });
    it('datab.data .cols() returns expected output ',
       function(){
	   var dobj = new datab.data([[1,2,3],
				      [4,5,6]]);
	   assert.ok(json_equal(dobj.cols(),
				[[1,4],
				 [2,5],
				 [3,6]]));
       });

});

describe(".cols() and .rows() work as expected", function(){
    it(".transpose().cols() equals .rows()", function(){
	var dobj = new datab.data([[1,2,3],
				   [4,5,6],
				   [7,8,9]]);
	assert.ok(json_equal(dobj.rows(), dobj.transpose().cols()));
    })
    it(".transpose().rows() equals .cols()", function(){
	var dobj = new datab.data([[1,2,3],
				   [4,5,6],
				   [7,8,9]]);
	assert.ok(json_equal(dobj.cols(), dobj.transpose().rows()));
    })
    it(".transpose().cols() not equal to .cols()", function(){
	var dobj = new datab.data([[1,2,3],
				   [4,5,6],
				   [7,8,9]]);
	assert.ok(!json_equal(dobj.rows(), dobj.transpose().rows()));
    })
    it(".transpose().rows() not equal to .rows()", function(){
	var dobj = new datab.data([[1,2,3],
				   [4,5,6],
				   [7,8,9]]);
	assert.ok(!json_equal(dobj.cols(), dobj.transpose().cols()));
    })
});

describe("index defaults correctly", function(){
    it(".index() of a three-column returns ['0','1','2']", function(){
	var dobj = new datab.data([[1,2,3],
				   [4,5,6],
				   [7,8,9]]);
	assert.ok(json_equal(dobj.index("row"),
			     ["0","1","2"]));
	assert.ok(json_equal(dobj.index("col"),
			     ["0","1","2"]));
	assert.ok(json_equal(dobj.index(),
			     {"row":["0","1","2"],
			      "col":["0","1","2"]}));
    });
});




