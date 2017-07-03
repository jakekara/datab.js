// import datab bundle
const datab = require("./teststuff.js")["datab"];
const assert = require("./teststuff.js")["assert"];
const json_equal = require("./teststuff.js")["json_equal"];
const big_array = require("./teststuff.js")["big_array"];
const big_matrix = require("./teststuff.js")["big_matrix"];
const is_array = require("./teststuff.js")["is_array"];
const is_function = require("./teststuff.js")["is_function"];
const is_object = require("./teststuff.js")["is_object"];


describe("teststuff.is_array", function(){
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

describe("teststuff.is_function", function(){

    it("is_function returns true for a function", function(){
	assert.equal(true, is_function(function(){}));
    });

    it("is_function returns false for an array", function(){
	assert.equal(false, is_function([[]]));
    });
});

describe("teststuff.is_object", function(){

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


describe("teststuff.json_equal", function(){

    it('json_equal comparison returns true for equal arrays',
       function(){
	   assert.equal(true,json_equal([[1,2,3],[4,5,6]],
				[[1,2,3],[4,5,6]]));
       });

    it('json_equal returns true for nulls',
       function(){
	   assert.equal(true,json_equal(null, null));
       });

    it('json_equal returns false for null, false',
       function(){
	   assert.equal(false,json_equal(null, false));
       });

    it('json_equal returns false for null, true',
       function(){
	   assert.equal(false,json_equal(null, true));
       });

    it('json_equal returns true for empty arrays',
       function(){
	   assert.equal(true,json_equal([], []));
	   assert.equal(true,json_equal([[]], [[]]));
	   assert.equal(true,json_equal([[[]]], [[[]]]));	   
       });

    it('json_equal returns false for different-dimension empty arrays',
       function(){
	   assert.equal(false,json_equal([[]], []));
	   assert.equal(false,json_equal([[]], [[[]]]));
	   assert.equal(false,json_equal([[[]]], [[[[]]]]));	   
       });

    it('json_equal returns true for empty dicts', function(){
	assert.equal(true,json_equal({},{}));
    });
    

    it('json_equal returns true for equal dicts', function(){
	assert.equal(true,json_equal({a:1,b:2,c:3},{a:1,b:2,c:3}));
    });

    it('json_equal returns false for different dicts', function(){
	assert.equal(false,json_equal({a:3},{a:1,b:2,c:3}));
    });

    it('json_equal returns false for an empty dict and an empty array', function(){
	assert.equal(false,json_equal({}, []));
    });

});

describe("teststuff.big_array", function(){

    it("big_array returns an array", function(){
	is_array( big_array );
    });

    it("big_array returns big array when no dimensions are specified", function(){
	var ba = big_array();
	assert.equal(true, ba.length >= 100);
    });

    it("big_array returns [] when zero length is specified", function(){
	assert.equal(true, json_equal([], big_array(0)));
    });

    it("big_array throws exception when negative number is specified", function(){
	assert.throws(()=>{big_array(-1);},Error);
    });


    it("big_array returns an array with specified dimension ", function(){
	assert.notEqual(big_array(100).length, 99);
	assert.equal(big_array(100).length, 100);
	assert.notEqual(big_array(100).length, 101);	
    });

});

describe("teststuff.big_matrix", function(){


    it("big_matrix returns an array", function(){
	assert.equal(true, is_array(big_matrix()));
    });
    it("big_matrix returns an array of arrays", function(){
	big_matrix().map(function(a){
	    assert.equal(true, is_array(a));
	});
    });
    it("big_matrix without an arguments returns at least 100 rows", function(){
	assert.equal(true, big_matrix().length >= 100);
    });

    it("big_matrix returns a matrix (all rows are the same length)", function(){
	var bm = big_matrix();
	var len = bm[0].length;
	bm.forEach(function(a){
	    assert.equal(false, a.length == len - 1);	    
	    assert.equal(true, a.length == len);
	    assert.equal(false, a.length == len + 1);
	});
    });


    var test_big_matrix_with_specified_dimensions = function(rows, cols){
	
	describe("big_matrix returns matrix with specified rows: " + rows + ", cols:" + cols,
		 function(){
		     var bm = big_matrix(rows, cols);
		     
		     it("big_matrix has the specified number of rows", function(){
			 assert.equal(bm.length, rows);
		     });
		
		     it ("big_matrix has the specified number of cols in each row",
			 function(){
			     var len = bm[0].length;
			     bm.forEach(function(a){
				 assert.equal(false, a.length == len - 1);	    
				 assert.equal(true, a.length == len);
				 assert.equal(false, a.length == len + 1);
			     });
			 });
		 });
    }

    // test_big_matrix_with_specified_dimensions(0,0);
    test_big_matrix_with_specified_dimensions(10,10);
    test_big_matrix_with_specified_dimensions(500,500);
    test_big_matrix_with_specified_dimensions(2500,2500);

    it("big_matrix with zero rows returns an empty 1d array", function(){
	assert.equal(true, json_equal(big_matrix(0), []));
    });

    describe("big_matrix with zero columns returns array of empty 1d arrays", function(){

	var test_big_matrix_with_no_cols = function(n){
	    it("testing big_matrix with " + n + " rows and zero columns.", function(){
		var bm = big_matrix(n, 0);
		bm.forEach(function(a){
		    assert.equal(true, json_equal(a, []));
		});
	    });
	}
	
	test_big_matrix_with_no_cols(0);
	test_big_matrix_with_no_cols(100);
	test_big_matrix_with_no_cols(1000);	
    });

    
});
    
