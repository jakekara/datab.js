// load datab
var datab = require("../dist/datab.rollup-bundle.js");

var hline = function(){
    console.log("\n-------------------------------------------------\n");
};

hline();

// make a new datab.data object
console.log("Creating a new datab.data object: [[1,2,3],[4,5,6]]");
var dobj = new datab.data([[1,2,3],[4,5,6]]);

// print the object as json
console.log(dobj.to_json());
hline();

// update the column index (headers)
console.log("Updating column headers to: Fish, Bears, Tacos");
dobj = dobj.index("col",["Fish","Bears","Tacos"]);
console.log(dobj.to_json());
hline();

// update the row index
console.log("Updating the row headers to: Buildings, Cars");
dobj = dobj.index("row",["Buildings","Cars"]);
console.log(dobj.to_json());
console.log("Notice how the above did not change? The row index doesn't exist\n"
	    + "in the simple record-oriented json representation of a table.\n"
	    + "\n"
	    + "Here's what it looks like transposed:");
console.log(dobj.transpose().to_json());

console.log("");
console.log("Now, if we call .to_json with true, it will include the __index"
	    + " in the record output:");
console.log(dobj.transpose().to_json(true));

hline();

console.log("deserializing from a json object that has row and column indexes"
	    + " already built in!");
dobj = new datab.data().from_obj(
    [{"car":"Mustang","year":1969,"price":"$25,000","__index":"SALLY"},
     {"car":"Corvette","year":1971,"price":"$33,000","__index":"VETTE-43"},
     {"car":"Beetle","year":2001,"price":"$2,000","__index":"DMV-433"}]);

console.log("Here are indexes");
console.log(dobj.index());
console.log("");
console.log("Here it is as JSON with indexes:");
console.log(dobj.to_json(true));
console.log("Here it is as JSON without indexes:");	    
console.log(dobj.to_json());
console.log("And again as JSON with indexes:");
console.log(dobj.to_json(true));


console.log("");
console.log("Now here's that same object, but without a __index value from the start");
    
dobj = new datab.data().from_obj(
    [{"car":"Mustang","year":1969,"price":"$25,000","not_index":"SALLY"},
     {"car":"Corvette","year":1971,"price":"$33,000","not_index":"VETTE-43"},
     {"car":"Beetle","year":2001,"price":"$2,000","not_index":"DMV-433"}]);
console.log("Here it is as JSON with indexes:");
console.log(dobj.to_json(true));
console.log("Here it is as JSON without indexes:");	    
console.log(dobj.to_json());

hline();

console.log("Some to_obj and from_obj magic...");
console.log(new datab.data()
	    .from_obj(new datab.data().from_obj(dobj.to_obj()).to_obj()).to_json());
console.log(new datab.data()
	    .from_obj(new datab.data().from_obj(dobj.to_obj()).to_obj()).to_json(true));
