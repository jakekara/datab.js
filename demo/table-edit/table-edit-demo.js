/* 
 * table-edit - demo using datab.js to open, edit and download a table
 *              locally within browser
 *
 * (c) jake kara 2017
 * jake@jakekara.com
 * jakekara.github.io
 *
 */

/*
 * handle_csv -  a callback that we'll bind to the file selector
 *               in this case, we'll draw the csv to #table-preview
 *               div, and make it editable
 *    args: a datab.data object
 */
var handle_csv = function( dobj )
{
    console.log( "Loaded datab.data object", dobj );

    // create a new datab.ui object from the data object
    // and draw it in the #table-preview div (whiping out
    // anything in that div!!
    var dui = new datab.ui()
	.obj(dobj)
	.container(d3.select("#table-preview"))
	.draw();

    dui.edit_mode(false)
    dui.drop_mode(false);
    
    // bind download button to the html table
    d3.select("#download-button").on("click", function(){
	dui.from_html()
	dui.download();
    });

    // bind transpose button
    d3.select("#transpose-button").on("click", function(){
	dui.obj(dui.obj().transpose()).draw();
    });

    // bind edit mode button
    d3.select("#edit-mode-button").on("click", function(){
	dui.edit_mode( !dui.edit_mode());

	if (dui.edit_mode() && dui.drop_mode())
	    dui.drop_mode(false);

	console.log("drop_mode", dui.drop_mode());
	console.log("edit_mode", dui.edit_mode());

	// dui.draw();
    });

    d3.select("#drop-mode-button").on("click", function()
    {
	dui.drop_mode( !dui.drop_mode());

	if (dui.edit_mode() && dui.drop_mode())
	    dui.edit_mode(false);

	console.log("drop_mode", dui.drop_mode());
	console.log("edit_mode", dui.edit_mode());

	// dui.draw();
    });
}

/* 
 * main - bind stuff
 */
var main = function(){
    new datab.data().from_input(d3.select("#file-chooser"),
				handle_csv);
}

main();


