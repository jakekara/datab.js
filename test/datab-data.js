/*
 * datab-data.js tests
 */

// import datab bundle
const datab = require("./teststuff.js")["datab"];
const assert = require("./teststuff.js")["assert"];
const json_equal = require("./teststuff.js")["json_equal"];

// set testing stuff up
// var assert = require('assert');

// // test two arrays for equality by
// // stringifying their values
// var json_equal = function(a1, a2)
// {
//     return JSON.stringify(a1) == JSON.stringify(a2);
// }

// describe("basics", function(){
    // describe('library exists', function(){
    // 	it('datab.data should exist', function(){
    // 	    assert.ok(typeof(datab.data)!="undefined");
    // 	});
    // });


    // describe('is a function', function(){
    // 	it('datab.data should be a function', function(){
    // 	    assert.ok(typeof(datab.data)!="undefined");
    // 	});
    // });

    // describe('returns an object', function(){
    // 	it('datab.data should return an object',
    // 	   function(){
    // 	       assert.ok(typeof(datab.data())=="object");
    // 	   });
    // });

    // describe('can be constructed', function(){
    // 	it('datab.data can be constructed',
    // 	   function(){
    // 	       var dobj = new datab.data([[1,2,3],
    // 					  [4,5,6]]);
    // 	       assert.ok(typeof(dobj) != "undefined");
    // 	   });
    // });

    // describe('can be constructed properly', function(){

    // 	it('array comparison returns true for equal arrays',
    // 	   function(){
    // 	       assert.ok(json_equal([[1,2,3],[4,5,6]],
    // 				    [[1,2,3],[4,5,6]]));
    // 	   });

	
    // 	it('array comparison does not return false '
    // 	   + 'positive with different values',
    // 	   function(){
    // 	       assert.ok(!json_equal([[1,2,3],[4,5,6]],
    // 				     [[10,20,30],[40,50,60]]));
    // 	   });

    // 	it('array comparison does not return false '
    // 	   + 'positive with different length arrays',
    // 	   function(){
    // 	       assert.ok(!json_equal([[1,2,3],[4,5,6]],
    // 				     [[1,2,3],[4,5,6],[7,8,9]]));
    // 	   });
	
    // 	it('datab.data .rows() returns expected output ',
    // 	   function(){
    // 	       var dobj = new datab.data([[1,2,3],
    // 					  [4,5,6]]);
	       
    // 	       assert.ok(JSON.stringify(dobj.rows()) ==
    // 			 JSON.stringify([[1,2,3],
    // 	       				 [4,5,6]]));
    // 	   });
    // 	it('datab.data .cols() returns expected output ',
    // 	   function(){
    // 	       var dobj = new datab.data([[1,2,3],
    // 					  [4,5,6]]);
    // 	       assert.ok(json_equal(dobj.cols(),
    // 				    [[1,4],
    // 				     [2,5],
    // 				     [3,6]]));
    // 	   });

    // });
// });

// describe(".cols() and .rows()", function(){
//     it(".transpose().cols() equals .rows()", function(){
// 	var dobj = new datab.data([[1,2,3],
// 				   [4,5,6],
// 				   [7,8,9]]);
// 	assert.ok(json_equal(dobj.rows(), dobj.transpose().cols()));
//     })
//     it(".transpose().rows() equals .cols()", function(){
// 	var dobj = new datab.data([[1,2,3],
// 				   [4,5,6],
// 				   [7,8,9]]);
// 	assert.ok(json_equal(dobj.cols(), dobj.transpose().rows()));
//     })
//     it(".transpose().cols() not equal to .cols()", function(){
// 	var dobj = new datab.data([[1,2,3],
// 				   [4,5,6],
// 				   [7,8,9]]);
// 	assert.ok(!json_equal(dobj.rows(), dobj.transpose().rows()));
//     })
//     it(".transpose().rows() not equal to .rows()", function(){
// 	var dobj = new datab.data([[1,2,3],
// 				   [4,5,6],
// 				   [7,8,9]]);
// 	assert.ok(!json_equal(dobj.cols(), dobj.transpose().cols()));
//     })
// });

// describe(".index()", function(){
//     describe("index defaults correctly", function(){
// 	it(".index() of a three-column returns ['0','1','2']", function(){
// 	    var dobj = new datab.data([[1,2,3],
// 				       [4,5,6],
// 				       [7,8,9]]);
// 	    assert.ok(json_equal(dobj.index("row"),
// 				 ["0","1","2"]));
// 	    assert.ok(json_equal(dobj.index("col"),
// 				 ["0","1","2"]));
// 	    assert.ok(json_equal(dobj.index(),
// 				 {"row":["0","1","2"],
// 				  "col":["0","1","2"]}));
// 	});
//     });
// });

// describe(".transpose()", function(){
// });

// describe(".copy()", function(){
// });

describe(".add_col()", function(){
});

describe(".add_row()", function(){
});

describe(".drop_col()", function(){
});

describe(".drop_row()", function(){
});

// Serialization

describe(".to_obj()", function(){
});


describe("to_json()", function(){
});

describe(".to_csv()", function(){
});

describe(".to_csvblob()", function(){
});

// Deserialization
describe(".from_input()", function(){
});

var car_matrix = function(){
    return  new datab.data().from_obj(
	[{"car":"Mustang","year":1969,"price":"$25,000","__index":"SALLY"},
	 {"car":"Corvette","year":1971,"price":"$33,000","__index":"VETTE-43"},
	 {"car":"Beetle","year":2001,"price":"$2,000","__index":"DMV-433"}]);

}

describe(".from_obj()", function(){
    it("can deserialize with an __index ", function(){

	var dobj = car_matrix();

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

    it("multiple passes through from_obj() and to_obj() yield the same matrix", function(){

	var dobj = car_matrix();

	assert.ok(json_equal(dobj.rows(), dobj.rows()));
	assert.ok(json_equal(dobj.cols(), dobj.cols()));
	
	assert.ok(json_equal(dobj.rows(),
			     dobj.from_obj(dobj.to_obj(true)).rows()));;

	assert.ok(json_equal(dobj.rows(),
			     dobj.from_obj(dobj.to_obj()).rows()));;

	assert.ok(json_equal(dobj.rows(),
			     new datab.data().from_obj(dobj.to_obj()).rows()));

	assert.ok(json_equal(dobj.rows(),
			     new datab.data()
			     .from_obj(new datab.data().from_obj(dobj.to_obj()).to_obj())
			     .rows()));


    });


});
