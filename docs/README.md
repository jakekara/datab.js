# datab.data

core functions:

             data - constructor
             copy - get a copy of a data object
            index - set or get the col or row index
        transpose - transpose the table
          add_col - add a column
          add_row - add a row
         drop_col - drop a column
         drop_row - drop a row
          to_json - create a json string of the data
           to_csv - output a csv
           to_obj - output as an array of (dict-like) objects
       to_csvblob - create a downbloadable csv blob
       from_input - create data object from a file input selection 
                    ( csv files only )
         from_obj - create data object from an array of dict-like
                    row objects

# databl.ui

functions for use in browser

              ui - constructor
             obj - accessor (getter/setter for this ui object's 
                   datab.data object
       container - accessor for this object's container (d3 selection)
            draw - draw table in d3 selection
       from_html - update the datab.data object by reading from the
                   HTML table
       edit_mode - accessor for column/row header editing mode
       drop_mode - access for column/row drop mode
            drop - drop a row or column and redraw the table