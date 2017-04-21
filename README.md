# datab

__basic tabular data transformations for use in browser or in node.__

# purpose

1. CSVs used to populate charts, graphs or databases are rarely 100% flight-ready,
in the right format we need. This allows columns to be dropped and renamed, or
the entire table to be transposed, so you don't have to modify your CSV outside
of your app and re-upload it. Transposing tables is really handy for charts,
where you aren't sure whether you want your columns or rows to be the X or Y
axis, for instance.

2. This is designed so any of the appropriate functions can be used in a node
context, outside of the browser.

# features

* pull in data from matrices (two-dimensional arrays), CSV files, JSON strings
  or objects (array of dict-like row objects)
* transform data (add and drop rows and columns, or transpose table)
* set column and row names ("indexes")
* output to JSON, js objects, CSV format CSV blobs
* render as editable HTML tables

# Design question: What to do about row indexes? Do I need them?

I'm not sure whether I want to keep the notion of row indeces, or if I should
only have column indeces.

The only compelling reason to keep them is that, if I don't, then what do I do
with column headers when a table is transposed?

# status: early

It's still early days.  This project is subject to incompatible API
changes. I'll probably lock in a major version by the end of April, when the
project this was developed for goes public.

# npm package

https://www.npmjs.com/package/datab

# github repo

https://github.com/jakekara/datab.js

# live demo

https://jakekara.github.io/datab.js/demo/

# docs (skimpy)

https://github.com/jakekara/datab.js/tree/master/docs