const data = require("./datab-data.js")["data"];

d = new data([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]);

console.log("Initial");
console.log(d);

d = d.copy().index("col",["one","two","three"]);

console.log("Named columns");
console.log(d);

d = d.drop_col("two");

// console.log( d.index("row") );
// console.log( d.index("col") );
console.log("Dropped column 'two'");
console.log(d);

console.log("transposed");
console.log(d.transpose());

console.log("csv format");
console.log(d.to_csv());

console.log("add row");
d = d.add_row( [100, 200],
	       "four",
	       12 );

console.log(d);


console.log("add col");
d = d.add_col( [ 111, 222, 333, 444 ],
	       "A",
	       12 );

console.log(d);

console.log(d.to_csv());
