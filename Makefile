#
# Makefile for datab.js
#
# CHANGELOG
#
# 4.21.2017 - switched to rollup
#
# 4.19.2017 - added forbrowser, with d3 excluded
#             bundling it in was silly...
#

default: forbrowser
# all: forbrowser demo bundle # datab.demo.bundle.js #

# create demo
demo: src/datab.js src/datab-ui.js src/datab-data.js demo/datab.demo.js
	browserify demo/datab.demo.js -o demo/datab.demo.bundle.js

# package datab for browser use
#    note: excludes d3, so it needs to be included elsewhere
#
forbrowser: src/datab.js src/datab-ui.js src/datab-data.js
	rollup --globals d3:d3 -c 

# create a bundle that includes d3
bundle: src/datab-data.js
	browserify src/datab.js > dist/datab.bundle.js
	uglifyjs dist/datab.bundle.js -o dist/datab.bundle.min.js

clean:
	rm -f dist/*
