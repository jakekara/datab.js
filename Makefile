all: datab.min.js datab.demo.bundle.js

# create demo
datab.demo.bundle.js: src/datab.js src/datab-ui.js src/datab-data.js demo/datab.demo.js
	browserify demo/datab.demo.js -o demo/datab.demo.bundle.js
	# browserify src/datab.demo.js -o demo/datab.demo.bundle.js

# package node lib for distribution
datab.min.js: src/datab-data.js
	browserify src/datab.js > dist/datab.bundle.js
	uglifyjs dist/datab.bundle.js -o dist/datab.bundle.min.js

clean:
	rm -f dist/*
