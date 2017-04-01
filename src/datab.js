const data = require("./datab-data.js")["data"];

d = new data([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]);

console.log(d);

console.log( d.index("row") );
console.log( d.index("col") );

d.index("col",["one","two","three"]);

console.log( d.index("row") );
console.log( d.index("col") );
