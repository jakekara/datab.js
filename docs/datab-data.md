<a name="data"></a>

## data
**Kind**: global class  

* [data](#data)
    * [new data(matrix)](#new_data_new)
    * [.equals()](#data+equals)
    * [.copy()](#data+copy)
    * [.transpose()](#data+transpose)
    * [.index([axis], [arr])](#data+index)
    * [.drop_row(id)](#data+drop_row)
    * [.drop_col()](#data+drop_col)
    * [.add_row(arr, id, index)](#data+add_row)
    * [.add_col(arr, id, index)](#data+add_col)
    * [.to_obj(index)](#data+to_obj)
    * [.to_csvblob()](#data+to_csvblob)
    * [.to_jsonblob()](#data+to_jsonblob)
    * [.to_csv()](#data+to_csv)
    * [.to_json()](#data+to_json)
    * [.from_obj(obj)](#data+from_obj)
    * [.from_input(sel, callback)](#data+from_input)

<a name="new_data_new"></a>

### new data(matrix)
create a data object from a two-dimensional array


| Param | Description |
| --- | --- |
| matrix | a matrix (2d-array) of the table |

<a name="data+equals"></a>

### data.equals()
equals - test that two datab.data objects are equal

**Kind**: instance method of [<code>data</code>](#data)  
**A**: - first object  
**B**: - second object  
<a name="data+copy"></a>

### data.copy()
copy - get a copy of the current object

**Kind**: instance method of [<code>data</code>](#data)  
<a name="data+transpose"></a>

### data.transpose()
transpose - return a copy of the current object with the table
transposed

**Kind**: instance method of [<code>data</code>](#data)  
<a name="data+index"></a>

### data.index([axis], [arr])
index - get or set a row or column index

**Kind**: instance method of [<code>data</code>](#data)  

| Param | Description |
| --- | --- |
| [axis] | "row" or "col" |
| [arr] | the new array of index values |

<a name="data+drop_row"></a>

### data.drop_row(id)
drop_row - drop a row

**Kind**: instance method of [<code>data</code>](#data)  

| Param | Description |
| --- | --- |
| id | the index value of the row to drop |

<a name="data+drop_col"></a>

### data.drop_col()
drop_col - drop a column
arg id - the index of the column to drop

**Kind**: instance method of [<code>data</code>](#data)  
<a name="data+add_row"></a>

### data.add_row(arr, id, index)
add_row - add a row

**Kind**: instance method of [<code>data</code>](#data)  

| Param | Description |
| --- | --- |
| arr | the array of values: must be equal in length to the number of columns |
| id | the id of the new row to be added |
| index | the position to insert the row |

<a name="data+add_col"></a>

### data.add_col(arr, id, index)
add_col - add a column

**Kind**: instance method of [<code>data</code>](#data)  

| Param | Description |
| --- | --- |
| arr | the array of values: must be equal in length to the number of rows |
| id | the id of the new col to be added |
| index | the position to insert the col |

<a name="data+to_obj"></a>

### data.to_obj(index)
to_obj - output array of row (dict-like) objects

**Kind**: instance method of [<code>data</code>](#data)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>boolean</code> | whether or to include the __index as a row property |

<a name="data+to_csvblob"></a>

### data.to_csvblob()
to_csvblob - create file-like csv blob

**Kind**: instance method of [<code>data</code>](#data)  
<a name="data+to_jsonblob"></a>

### data.to_jsonblob()
to_jsonblob - create file-like json blob

**Kind**: instance method of [<code>data</code>](#data)  
<a name="data+to_csv"></a>

### data.to_csv()
to_csv - output csv

**Kind**: instance method of [<code>data</code>](#data)  
<a name="data+to_json"></a>

### data.to_json()
to_json - output json string

**Kind**: instance method of [<code>data</code>](#data)  
<a name="data+from_obj"></a>

### data.from_obj(obj)
from_obj - create datab.data object from an array of row objects

**Kind**: instance method of [<code>data</code>](#data)  

| Param | Description |
| --- | --- |
| obj | a table expressed as an array of dicts |

<a name="data+from_input"></a>

### data.from_input(sel, callback)
from_input - read a csv from a file input field

**Kind**: instance method of [<code>data</code>](#data)  

| Param | Description |
| --- | --- |
| sel | d3 selection to attatch to |
| callback | function to call when file is selected |

